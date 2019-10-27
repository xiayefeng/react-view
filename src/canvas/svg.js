import React, { Component } from "react";

const DEFAULT_PROPS = {
  style: { stroke: "red", strokeWidth: 1, rx: 4 }
};

export class Svg extends Component {
  render() {
    return (
      <svg
        version="1.1"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.props.children}
      </svg>
    );
  }
}

export class Circle extends Component {
  static defaultProps = DEFAULT_PROPS;
  render() {
    return <circle {...this.props}></circle>;
  }
}

export class Rect extends Component {
  static defaultProps = DEFAULT_PROPS;
  render() {
    return <rect {...this.props} />;
  }
}

export class Text extends Component {
  render() {
    return <text {...this.props}>{this.props.children}</text>;
  }
}

class Ellipse extends Component {
  static defaultProps = DEFAULT_PROPS;
  render() {
    return <ellipse {...this.props} />;
  }
}

export class Line extends Component {
  static defaultProps = DEFAULT_PROPS;
  get start() {
    return this.props.children[0].props;
  }
  get end() {
    return this.props.children[1].props;
  }
  render() {
    return (
      <line
        x1="{this.start.x}"
        y1="{this.start.y}"
        x2="{this.end.x}"
        y2="{this.end.y}"
        {...this.props}
      />
    );
  }
}

export class Point extends Component {
  render() {
    return null;
  }
}

export class PolyLine extends Component {
  static defaultProps = DEFAULT_PROPS;
  render() {
    const points = this.props.children
      .map(item => {
        return item.props.x + "," + item.props.y;
      })
      .jion(" ");
    return <polyline points={points} {...this.props} />;
  }
}

class Polygon extends Component {
  static defaultProps = DEFAULT_PROPS;
  render() {
    const points = this.props.children
      .map(item => {
        return item.props.x + "," + item.props.y;
      })
      .jion(" ");
    return <polygon points={points} {...this.props} />;
  }
}

class SvgComponent extends Component {
  render() {
    return (
      <>
        <Svg>
          <Circle cx={50} cy={20} r={10} stroke={"black"} />
          <Ellipse cx={150} cy={120} rx={10} ry={30} stroke={"black"} />
          <Line>
            <Point x={10} y={10} />
            <Point x={10} y={100} />
          </Line>
          <PolyLine>
            <Point x={220} y={100} />
            <Point x={300} y={210} />
            <Point x={170} y={250} />
          </PolyLine>

          <Polygon>
            <Point x={20} y={100} />
            <Point x={30} y={210} />
            <Point x={70} y={250} />
            <Point x={70} y={320} />
          </Polygon>
        </Svg>
      </>
    );
  }
}

export default SvgComponent;
