import * as React from 'react';

interface IconProps {
    size: string;
    icon: string;
    class?: string;
}

export class Icon extends React.PureComponent<IconProps> {

    render() {
        return (
            <i
                style={{
                    fontSize: this.props.size,
                }}
                className={`fa fa-${this.props.icon} ${this.props.class}`} aria-hidden="true"></i>
        );
    }
}