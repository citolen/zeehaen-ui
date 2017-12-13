import * as React from 'react';

import { Navigation, NavigationHeader } from '../../components/navigation';
import { Icon } from '../../components/icon';
import { Shortcut } from '../../components/shortcut';

import { GridGroup } from '../../components/grid-group';

import { AnimatedWrapper } from '../../components/animated-wrapper';

const styles = require('./style.css');

export const Sensors = AnimatedWrapper(class Sensors extends React.Component {

    render() {
        return (
            <div className={styles.root}>
                <Navigation backLink="/">
                    <Icon size="40px" icon="connectdevelop" />
                    <NavigationHeader headerText="Sensors"/>
                </Navigation>
                <GridGroup>
                    <Shortcut key="gps" icon="globe" description="gps" link="/sensors/gps" />
                </GridGroup>
            </div>
        );
    }
});