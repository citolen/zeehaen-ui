import * as React from 'react';
import * as _ from 'lodash';

import {Responsive} from 'react-grid-layout';
const WidthProvider = require('./width-provider.jsx').WidthProvider;
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const styles = require('./style.css');

export class GridGroup extends React.Component {

    buildLayouts(): any {
        const layout = [];
        const children = _.isArray(this.props.children) ?
            this.props.children :
            [this.props.children];
        for (let i = 0; i < children.length; i++) {
            layout.push({
                i: (children[i] as any).key,
                x: 0,
                y: 0,
                w: 'width' in (children[i] as any).props ? (children[i] as any).props.width : 2,
                h: 'height' in (children[i] as any).props ? (children[i] as any).props.height : 2
            });
        }
        return {
            lg: layout,
            md: layout,
            sm: layout,
            xs: layout,
            xxs: layout
        };
    }

    render() {
        return (
            <ResponsiveReactGridLayout
                className={styles.layout}
                layouts={this.buildLayouts()}
                isDraggable={true}
                compactType="horizontal"
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 12, md: 10, sm: 8, xs: 6, xxs: 4}}>
                { this.props.children }
            </ResponsiveReactGridLayout>
        );
    }
}