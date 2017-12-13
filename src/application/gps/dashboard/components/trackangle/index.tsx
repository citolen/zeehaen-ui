import * as React from 'react';
import { observer } from 'mobx-react';
import { GpsSource } from '../../../store/gps-source';

import * as moment from 'moment';
import * as _ from 'lodash';


const styles = require('./style.css');
const CompassIcon = require('./compass.svg');

import { CurvedText } from './curved-text';

interface TrackAngleProps {
    state: GpsSource;
    style?: any;
    className?: string;
    width?: number;
    height?: number;
}

export const TrackAngle = observer(class TrackAngle extends React.Component<TrackAngleProps> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const { state, width, height, ...other} = this.props;
        return (
            <div {...other} className={`${this.props.className} ${styles.root}`}>
                <div className={styles.header}>
                    <span>Track angle</span>
                </div>
                <div className={styles.content}>
                    <div className={styles['compass']}
                            style={{
                                transform: `rotate(-${state.trackangle}deg)`
                            }}>
                        <CurvedText className={styles['compass-card']} offset={0} text="N" width={200} height={200} top={20} left={20} radius={80}/>
                        <CurvedText className={styles['compass-card-sub']} offset={45} text="NE" width={200} height={200} top={20} left={20} radius={80}/>
                        <CurvedText className={styles['compass-card']} offset={90} text="E" width={200} height={200} top={20} left={20} radius={80}/>
                        <CurvedText className={styles['compass-card-sub']} offset={135} text="SE" width={200} height={200} top={20} left={20} radius={80}/>
                        <CurvedText className={styles['compass-card']} offset={180} text="S" width={200} height={200} top={20} left={20} radius={80}/>
                        <CurvedText className={styles['compass-card-sub']} offset={225} text="SW" width={200} height={200} top={20} left={20} radius={80}/>
                        <CurvedText className={styles['compass-card']} offset={270} text="W" width={200} height={200} top={20} left={20} radius={80}/>
                        <CurvedText className={styles['compass-card-sub']} offset={315} text="NW" width={200} height={200} top={20} left={20} radius={80}/>
                        
                        
                        <div className={styles['compass-degrees']}>
                            <CurvedText className={styles['compass-degree']} offset={0} text="0" width={140} height={140} top={17.5} left={17.5} radius={52.5}/>
                            <CurvedText className={styles['compass-degree']} offset={45} text="45" width={140} height={140} top={17.5} left={17.5} radius={52.5}/>
                            <CurvedText className={styles['compass-degree']} offset={90} text="90" width={140} height={140} top={17.5} left={17.5} radius={52.5}/>
                            <CurvedText className={styles['compass-degree']} offset={135} text="135" width={140} height={140} top={17.5} left={17.5} radius={52.5}/>
                            <CurvedText className={styles['compass-degree']} offset={180} text="180" width={140} height={140} top={17.5} left={17.5} radius={52.5}/>
                            <CurvedText className={styles['compass-degree']} offset={225} text="225" width={140} height={140} top={17.5} left={17.5} radius={52.5}/>
                            <CurvedText className={styles['compass-degree']} offset={270} text="270" width={140} height={140} top={17.5} left={17.5} radius={52.5}/>
                            <CurvedText className={styles['compass-degree']} offset={315} text="315" width={140} height={140} top={17.5} left={17.5} radius={52.5}/>
                            <div className={styles['compass-circle']}
                                style={{
                                    transform: `rotate(${state.trackangle}deg)`
                                }}>
                                <CompassIcon className={styles['compass-icon']}/>
                            </div>
                        </div>
                    </div>
                    
                    { state.trackangle !== undefined && (
                        <div className={styles.label}>
                            { state.trackangle }&deg;
                        </div>
                    )}
                </div>
            </div>
        );
    }
});