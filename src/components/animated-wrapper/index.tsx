import * as React from 'react';
const Animated = require('animated/lib/targets/react-dom');

const styles = require('./style.css');

interface AnimatedWrapperState {
    animate: any;
}

export const AnimatedWrapper = (WrappedComponent : any) => class AnimatedWrapper extends React.Component<{}, AnimatedWrapperState> {
    constructor(props : any) {
        super(props);
        this.state = {
            animate: new Animated.Value(0)
        };
    }

    componentWillAppear(cb : Function) {
        Animated.spring(this.state.animate, { toValue: 1 }).start();
        cb();
    }

    componentWillEnter(cb: Function) {
        setTimeout(
            () => Animated.spring(this.state.animate, { toValue: 1 }).start(),
            250
        );
        cb();
    }

    componentWillLeave(cb: Function) {
        Animated.spring(this.state.animate, { toValue: 0 }).start();
        setTimeout(() => cb(), 175);
    }
    
    render() {
        const style = {
            opacity: Animated.template`${this.state.animate}`,
            transform: Animated.template`
                translate3d(0, ${this.state.animate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["12px", "0px"]
                })} ,0)
            `
        };
        return (
            <Animated.div style={style} className={styles.root}>
                <WrappedComponent {...this.props} />
            </Animated.div>
        );
    }
};