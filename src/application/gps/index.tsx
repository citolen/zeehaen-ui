import * as React from 'react';

import { Navigation, NavigationHeader } from '../../components/navigation';
import { Icon } from '../../components/icon';
import { Link, Redirect } from 'react-router-dom';

import { AnimatedWrapper } from '../../components/animated-wrapper';
import { observer } from 'mobx-react';
import { gpsStore } from './store/';

import { GPSDashboard } from './dashboard';

console.log(gpsStore);

const styles = require('./style.css');

interface GPSProps {
    params: any;
    history: any;
}

export const GPS = AnimatedWrapper(observer(class GPS extends React.Component<GPSProps> {

    componentDidMount() {
        gpsStore.loadSources();
        gpsStore.subscribeToSourcesChange('gps_application');

    }

    componentWillUnmount() {
        gpsStore.unsubscribeFromSourcesChange('gps_application');
    }

    render() {
        return (
            <div className={styles.root}>
                <Navigation backLink={this.props.params.source_id ? "/sensors/gps" : "/sensors/"}>
                    <Icon size="40px" icon="globe" />
                    <NavigationHeader headerText="GPS"/>
                    { this.props.params.source_id &&
                        gpsStore.sources.has(this.props.params.source_id) && (
                        <span className={ styles['gps-tag'] }>{ this.props.params.source_id }</span>
                    )}
                </Navigation>
                { gpsStore.loading ? (
                    <div>Loading</div>
                ) : (
                    this.props.params.source_id ? (
                        gpsStore.sources.has(this.props.params.source_id) ? (
                            <GPSDashboard source_id={this.props.params.source_id } />
                        ) : (
                            <Redirect to='/sensors/gps' />
                        )
                    ) : (
                        <div>
                            { Array.from(gpsStore.sources.keys()).map((sourceId) => (
                                <div key={sourceId}>
                                    <Link to={`/sensors/gps/${sourceId}`}>
                                        {sourceId}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        );
    }
}));