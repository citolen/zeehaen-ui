import * as React from 'react';

import { Icon } from '../icon';
import { Link } from 'react-router-dom';

const styles = require('./style.css');

interface ShortcutProps {
    icon: string;
    description: string;
    link: string;
}

export class Shortcut extends React.Component<ShortcutProps> {

    render() {

        return (
            <div {...this.props} className={styles.root}>
                <Link to={this.props.link}>
                    <div className={styles.box}>
                        <Icon size="80px" icon={this.props.icon} class={styles.icon} />
                    </div>
                    <div className={styles.description}>
                        { this.props.description }
                    </div>
                </Link>
            </div>
        )
    }
}