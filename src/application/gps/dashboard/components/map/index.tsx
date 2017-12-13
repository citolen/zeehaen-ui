import * as React from 'react';
import { observer } from 'mobx-react';
import { GpsSource } from '../../../store/gps-source';
const ReactLeaflet = require('react-leaflet');
import { LatLng, Icon } from 'leaflet';
require('leaflet/dist/leaflet.css');
require('leaflet/dist/images/marker-icon-2x.png');
require('leaflet/dist/images/marker-icon.png');
require('leaflet/dist/images/marker-shadow.png');
require('./boat.png');
require('leaflet-rotatedmarker');

const styles = require('./style.css');

interface MapProps {
    state: GpsSource;
    style?: any;
    className?: string;
    width?: number;
    height?: number;
}

interface MapState {
    zoom: number;
}

const boatIcon = new Icon({
    iconUrl: '/dist/images/boat.png',
    iconSize: [43, 66],
    iconAnchor: [21, 33]
});

export const MapPosition = observer(class MapPosition extends React.Component<MapProps, MapState> {

    constructor(props: any) {
        super(props);

        this.state = {
            zoom: 13
        };
    }

    onViewportChanged = (viewport: any) => {
        this.setState({zoom: viewport.zoom});
    }

    render() {
        const { state, width, height, ...other} = this.props;
        if (!state.latitude || !state.longitude) {
            return null;
        }
        const position: LatLng = new LatLng(state.latitude, state.longitude);
        const trackangle = state.trackangle;
        return (
            <div {...other} className={`${this.props.className} ${styles.root}`}>
                <div className={styles.header}>
                    <span>Map</span>
                </div>
                <div className={styles.content}>
                    <ReactLeaflet.Map
                        center={position}
                        zoom={this.state.zoom}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        onViewportChanged={this.onViewportChanged}
                    >
                        <ReactLeaflet.TileLayer
                            url="http://127.0.0.1:3000/tile/{z}/{x}/{y}?LAYERS=config_1_20.00_0&TRANSPARENT=FALSE&UGC=TRUE&navtoken=eyJrZXkiOiJOYXZpb25pY3NfaW50ZXJuYWxwdXJwb3NlXzAwMDAxIiwia2V5RG9tYWluIjoid2ViYXBwLm5hdmlvbmljcy5jb20iLCJyZWZlcmVyIjoid2ViYXBwLm5hdmlvbmljcy5jb20iLCJyYW5kb20iOjE1MTMxNzg4MzczMTV9"
                        />
                        <ReactLeaflet.Marker
                            position={position}
                            icon={boatIcon}
                            ref={(marker: any) => {
                                if (!marker) { return; }
                                marker.leafletElement.setRotationAngle(trackangle);
                            }}>
                        </ReactLeaflet.Marker>
                    </ReactLeaflet.Map>
                </div>
            </div>
        );
    }
});