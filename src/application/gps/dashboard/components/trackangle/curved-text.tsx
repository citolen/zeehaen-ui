import * as React from 'react';
const CircleType = require('circletype');

interface CurvedTextProps {
    width: number;
    height: number;
    top: number;
    left: number;
    text: string;
    radius: number;
    offset: number;
    className?: string;
}

export class CurvedText extends React.Component<CurvedTextProps> {

    render() {
        const offset = (25 / 2) + ((this.props.offset % 360 / 360) * 50);
        const cx = this.props.left + this.props.radius;
        const cy = this.props.top + this.props.radius;
        const r = this.props.radius;
        const path = `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,1 ${r*2},0 a ${r},${r} 0 1,1 -${r*2},0 a ${r},${r} 0 1,1 ${r*2},0 a ${r},${r} 0 1,1 -${r*2},0`;
        return (
            <svg style={{position: 'absolute', top: '0px', left: '0px'}}
                width={this.props.width} height={this.props.height}>
                <defs>
                    <path id={`circle${this.props.text}`} d={path} />
                </defs>
                <text className={this.props.className} fill='#003399' dangerouslySetInnerHTML={{__html: `<textPath startOffset="${offset}%" xlink:href="#circle${this.props.text}">${this.props.text}</textPath>`}} />
            </svg>
        );
    }
}