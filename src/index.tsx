import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { TransitionGroup } from "react-transition-group";

import { Launchpad } from './application/launchpad';
import { Sensors } from './application/sensors';
import { GPS } from './application/gps';

require('./css/global.gcss');
const styles = require('./index.css');

const firstChild = (props : any) => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
};

const Root = () => (
    <Router>
        <div className={styles.content}>
            <Route exact path="/"
                children={({ match, ...rest }) => (
                    <TransitionGroup component={firstChild}>
                        {match && <Launchpad {...rest} />}
                    </TransitionGroup>
                )} />
            <Route exact path="/sensors"
                children={({ match, ...rest }) => (
                    <TransitionGroup component={firstChild}>
                        {match && <Sensors {...rest} />}
                    </TransitionGroup>
                )} />
            <Route path="/sensors/gps/:source_id?"
                children={({ match, ...rest }) => {
                    if (match) {
                        (rest as any).params = match.params;
                    }
                    return (
                        <TransitionGroup component={firstChild}>
                            {match && <GPS {...rest} />}
                        </TransitionGroup>
                );}} />
        </div>
    </Router>
);

ReactDOM.render(
    <Root />,
    document.getElementById("zeehaen-app")
);