import { observable, action } from 'mobx';
import gql from 'graphql-tag';
import zeehaen from '../../../store/zeehaen';
import { Subscription } from 'apollo-client/util/Observable';

import * as moment from 'moment';
import * as _ from 'lodash';

import { GpsSource } from './gps-source';

const querySources = gql`
query {
    service(id: "GPS") {
        ...on GpsService {
            id
            sources {
                id
                state {
                    datetime
                    latitude
                    longitude
                    altitude
                    speedkmh
                    speedknots
                    trackangle
                    activeSatellites
                    visibleSatellites {
                        prn
                        elevation
                        azimuth
                        snr
                        status
                    }
                    fixType
                    horizontalDOP
                    verticalDOP
                    positionDOP
                }
            }
        }
    }
}
`;

const subscriptionSourceAdded = gql`
subscription gpsSourceAdded {
    gpsSourceAdded {
        id
    }
}
`;

const subscriptionSourceRemoved = gql`
subscription gpsSourceRemoved {
    gpsSourceRemoved {
        id
    }
}
`;

const subscriptionSourceUpdated = gql`
subscription gpsSourceUpdated($id: String) {
    gpsSourceUpdated(id: $id) {
        id
        state {
            datetime
            latitude
            longitude
            altitude
            speedkmh
            speedknots
            trackangle
            activeSatellites
            visibleSatellites {
                prn
                elevation
                azimuth
                snr
                status
            }
            fixType
            horizontalDOP
            verticalDOP
            positionDOP
        }
    }
}
`;

export class GPSStore {
    @observable loading = true;
    @observable sources: Map<string, GpsSource> = new Map<string, GpsSource>();

    sourcesChangeSubscribers: Set<string> = new Set<string>();
    sourceAddedSubscription: Subscription = null;
    sourceRemovedSubscription: Subscription = null;

    sourcesUpdateSubscribers: Map<string, Set<string>> = new Map<string, Set<string>>();
    sourcesUpdateSubscriptions: Map<string, Subscription> = new Map<string, Subscription>();

    unsubscribeFromSourcesChange(subscriberId: string) {
        if (!this.sourcesChangeSubscribers.has(subscriberId)) {
            return;
        }
        this.sourcesChangeSubscribers.delete(subscriberId);
        if (this.sourcesChangeSubscribers.size > 0) {
            return;
        }
        if (this.sourceAddedSubscription) {
            this.sourceAddedSubscription.unsubscribe()
            this.sourceAddedSubscription = null;
        }
        if (this.sourceRemovedSubscription) {
            this.sourceRemovedSubscription.unsubscribe();
            this.sourceRemovedSubscription = null;
        }
    }

    subscribeToSourcesChange(subscriberId: string) {
        if (this.sourcesChangeSubscribers.has(subscriberId)) {
            return;
        }
        this.sourcesChangeSubscribers.add(subscriberId);
        if (this.sourcesChangeSubscribers.size > 1) {
            return;
        }
        this.sourceAddedSubscription = zeehaen.subscribe({
            query: subscriptionSourceAdded,
        }).subscribe({
            next: this.onSourceAdded,
            error: this.onError
        });
        this.sourceRemovedSubscription = zeehaen.subscribe({
            query: subscriptionSourceRemoved,
        }).subscribe({
            next: this.onSourceRemoved,
            error: this.onError
        });
    }

    subscribeToSourceUpdate(subscriberId: string, sourceId: string) {
        if (!this.sources.has(sourceId)) {
            return;
        }
        let subscribers = this.sourcesUpdateSubscribers.get(sourceId);
        if (subscribers && subscribers.has(subscriberId)) {
            return;
        }
        if (!subscribers) {
            subscribers = new Set<string>();
            this.sourcesUpdateSubscribers.set(sourceId, subscribers);
        }
        subscribers.add(subscriberId);
        if (subscribers.size > 1) {
            return;
        }
        const subscription = zeehaen.subscribe({
            query: subscriptionSourceUpdated,
            variables: {
                id: sourceId
            }
        }).subscribe({
            next: this.onSourceUpdated,
            error: this.onError
        });
        this.sourcesUpdateSubscriptions.set(sourceId, subscription);
    }

    unsubscribeFromSourceUpdate(subscriberId: string, sourceId: string) {
        if (!this.sources.has(sourceId)) {
            return;
        }
        const subscribers = this.sourcesUpdateSubscribers.get(sourceId);
        if (!subscribers || !subscribers.has(subscriberId)) {
            return;
        }
        subscribers.delete(subscriberId);
        if (subscribers.size > 0) {
            return;
        }
        const subscription = this.sourcesUpdateSubscriptions.get(sourceId);
        if (subscription) {
            subscription.unsubscribe();
            this.sourcesUpdateSubscriptions.delete(sourceId);
        }
    }

    @action
    onSourceAdded = (payload: any): void => {
        console.log('source added', payload.data);
        const id = payload.data.gpsSourceAdded.id;
        if (this.sources.has(id)) { return; }
        this.sources.set(id, new GpsSource());
    }

    @action
    onSourceUpdated = (payload: any): void => {
        const id: string = payload.data.gpsSourceUpdated.id;
        const state: any = _.clone(payload.data.gpsSourceUpdated.state);
        const source = this.sources.get(id);
        if (!source) { return; }
        if (state.datetime) {
            state.datetime = moment(state.datetime);
        }
        source.merge(state);
    }

    @action
    onSourceRemoved = (payload: any): void => {
        console.log('source removed', payload.data);
        const id = payload.data.gpsSourceRemoved.id;
        this.sources.delete(id);
    }

    onError = (payload: any): void => {
        console.error(payload);
    }

    @action
    loadSources() {
        this.loading = true;
        this.sources.clear();
        zeehaen.query({
            fetchPolicy: 'network-only',
            query: querySources
        })
        .then(action((data: any) => {
            this.loading = false;
            const sources = data.data.service.sources as any[];
            sources.forEach((source) => {
                const state = _.clone(source.state);
                if (state && state.datetime) {
                    state.datetime = moment(state.datetime);
                }
                this.sources.set(source.id, new GpsSource(state));
            });
        }))
        .catch(error => console.error(error));
    }
}

export const gpsStore = new GPSStore();