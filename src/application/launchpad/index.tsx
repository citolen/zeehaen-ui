import * as React from 'react';

import { Navigation, NavigationHeader } from '../../components/navigation';
import { Icon } from '../../components/icon';
import { Shortcut } from '../../components/shortcut';

import { GridGroup } from '../../components/grid-group';

import { AnimatedWrapper } from '../../components/animated-wrapper';

const styles = require('./style.css');

export const Launchpad = AnimatedWrapper(class Launchpad extends React.Component {

    render() {
        return (
            <div className={styles.root}>
                <Navigation>
                    <Icon size="40px" icon="rocket" />
                    <NavigationHeader headerText="Launchpad" />
                </Navigation>
                <GridGroup>
                    <Shortcut key="sensors" icon="connectdevelop" description="sensors" link="/sensors" />
                    <Shortcut key="cockpit" icon="tachometer" description="cockpit" link="/cockpit" />
                    <Shortcut key="emergency" icon="life-ring" description="emergency" link="/emergency" />
                </GridGroup>
            </div>
        );
    }
});