import * as React from 'react';
import { observer } from 'mobx-react';
import { GpsSource } from '../../../store/gps-source';

import * as moment from 'moment';
import * as _ from 'lodash';

import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const styles = require('./style.css');

interface SpeedProps {
    state: GpsSource;
    style?: any;
    className?: string;
    width?: number;
    height?: number;
}

export const Speed = observer(class Speed extends React.Component<SpeedProps> {

    history: any[] = [];
    last_measurement_datetime?: moment.Moment;

    constructor(props: any) {
        super(props);
    }

    render() {
        // const current_time = this.props.state.datetime;
        // const current_measurement = this.props.state.speedknots;
        // if (!current_measurement) {
        //     return null;
        // }
        // if (
        //     (!this.last_measurement_datetime || !current_time.isSame(this.last_measurement_datetime)) &&
        //     current_measurement != null) {
        //     this.last_measurement_datetime = current_time;
        //     this.history = _.clone(this.history);
        //     this.history.push({
        //         name: this.last_measurement_datetime,
        //         speedknots: current_measurement
        //     });
            
        //     if (this.history.length > 1 &&
        //         this.last_measurement_datetime.diff(this.history[0].name, "seconds") > 30) {
        //         this.history = this.history.slice(1);
        //     }
        // }
        const { state, width, height, ...other} = this.props;
        return (
            <div {...other} className={`${this.props.className} ${styles.root}`}>
                <div className={`${styles.header} dragHandle`}>
                    <span>Speed</span>
                </div>
                <div className={styles.content}>
                    {/* <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={this.history}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4858ff" stopOpacity={0.9}/>
                                    <stop offset="95%" stopColor="#4858ff" stopOpacity={0.5}/>
                                </linearGradient>
                            </defs>
                            <Tooltip
                                isAnimationActive={false}
                            />
                            <CartesianGrid strokeDasharray="3 3"/>
                            <YAxis mirror={true}
                                tickSize={5}
                                tick={{fontSize: 15}}
                                padding={{top: 15, bottom: 0}}
                                axisLine={false}
                                orientation="right" />
                            <Area
                                strokeWidth={2}
                                isAnimationActive={false}
                                type="monotone"
                                dataKey="speedknots"
                                stroke="#4858ff"
                                fillOpacity={1}
                                fill="url(#colorUv)"
                                unit="knots" />
                        </AreaChart>
                    </ResponsiveContainer> */}
                    { state.speedknots !== undefined && (
                        <div className={styles.label}>
                            { state.speedknots.toFixed(2) }&nbsp;knots
                        </div>
                    )}
                    { state.speedkmh !== undefined && (
                        <div className={styles.label}>
                            { state.speedkmh.toFixed(2) }&nbsp;km/h
                        </div>
                    )}
                </div>
            </div>
        );
    }
});