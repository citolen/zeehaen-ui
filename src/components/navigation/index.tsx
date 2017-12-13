import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Animated = require('animated/lib/targets/react-dom');

const styles = require('./style.css');

interface NavigationHeaderProps {
    headerText: string
}

export class NavigationHeader extends React.PureComponent<NavigationHeaderProps> {

    render() {
        return (
            <span className={styles['header']}>
                { this.props.headerText}
            </span>
        );
    }
}

interface NavigationProps {
    backLink?: string
}

interface NavigationState {
    animate: any
}

export class Navigation extends React.Component<NavigationProps, NavigationState> {

    constructor(props: any) {
        super(props);

        this.state = {
			animate: new Animated.Value(0)
		};
    }

    componentDidMount() {
        setTimeout(() => Animated.spring(this.state.animate, { toValue: 1 }).start(), 375);
    }
    
	componentWillReceiveProps() {
		setTimeout(() => Animated.spring(this.state.animate, { toValue: 1 }).start(), 375);
    }

    render() {
        const backLinkStyle = {
			transform: Animated.template`
				translate3d(${this.state.animate.interpolate({
				inputRange: [0, 1],
				outputRange: ["-24px", "0px"]
			})},0,0)
			`,
			opacity: Animated.template`${this.state.animate}`
		};
        return (
            <Animated.div style={backLinkStyle} className={styles['root']}>
                { this.props.backLink && (
                    <NavLink
                        to={this.props.backLink}
                        >
                        <div className={styles['back-button']}>
                            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
                        </div>
                    </NavLink>
                )}
                {this.props.children}
            </Animated.div>
        );
    }
}