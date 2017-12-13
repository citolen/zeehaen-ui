import { observable, action } from 'mobx';
import * as moment from 'moment';

// activeSatellites
// visibleSatellites {
//     prn
//     elevation
//     azimuth
//     snr
//     status
// }
export class GpsSource {
    @observable datetime: moment.Moment;
    @observable latitude: number;
    @observable longitude: number;
    @observable altitude: number;
    @observable speedkmh: number;
    @observable speedknots: number;
    @observable trackangle: number;
    @observable fixType: string;
    @observable horizontalDOP: number;
    @observable verticalDOP: number;
    @observable positionDOP: number;

    constructor(state?: any) {
        if (state) {
            this.merge(state);
        }
    }

    @action
    public merge(state: any) {
        if ('datetime' in state) {
            this.datetime = state['datetime'];
        }
        if ('latitude' in state) {
            this.latitude = state['latitude'];
        }
        if ('longitude' in state) {
            this.longitude = state['longitude'];
        }
        if ('altitude' in state) {
            this.altitude = state['altitude'];
        }
        if ('speedkmh' in state) {
            this.speedkmh = state['speedkmh'];
        }
        if ('speedknots' in state) {
            this.speedknots = state['speedknots'];
        }
        if ('trackangle' in state) {
            this.trackangle = state['trackangle'];
        }
        if ('fixType' in state) {
            this.fixType = state['fixType'];
        }
        if ('horizontalDOP' in state) {
            this.horizontalDOP = state['horizontalDOP'];
        }
        if ('verticalDOP' in state) {
            this.verticalDOP = state['verticalDOP'];
        }
        if ('positionDOP' in state) {
            this.positionDOP = state['positionDOP'];
        }
    }
}