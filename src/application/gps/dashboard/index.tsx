import * as React from 'react';
import { observer } from 'mobx-react';
import { gpsStore } from '../store';

import { GridGroup } from '../../../components/grid-group';

import { Speed } from './components/speed';
import { TrackAngle } from './components/trackangle';
import { MapPosition } from './components/map';

const styles = require('./style.css');

interface GPSDashboardProps {
    source_id: string;
}

export const GPSDashboard = observer(class GPSDashboard extends React.Component<GPSDashboardProps> {

    componentDidMount() {
        this.subscribe(this.props.source_id);
    }

    componentWillReceiveProps(newProps: GPSDashboardProps) {
        if (newProps.source_id !== this.props.source_id) {
            if (this.props.source_id) {
                this.unsubscribe(this.props.source_id);
            }
            this.subscribe(newProps.source_id);
        }
    }

    componentWillUnmount() {
        this.unsubscribe(this.props.source_id);
    }

    subscribe(source_id: string): void {
        gpsStore.subscribeToSourceUpdate('gps-dashboard', source_id);
    }

    unsubscribe(source_id: string): void {
        gpsStore.unsubscribeFromSourceUpdate('gps-dashboard', source_id);
    }

    render() {
        const state: any = gpsStore.sources.get(this.props.source_id);
        return (
            <div className={styles.root}>
                <GridGroup>
                    <Speed key="speed" state={state} width={2} />
                    <TrackAngle key="trackangle" state={state} width={3} height={3} />
                    <MapPosition key="map" state={state} width={4} height={4} />
                </GridGroup>
            </div>
        );
    }
});