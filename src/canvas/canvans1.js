import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Canvas extends Component {
  state = {
    children: [],
    ctx: null
  };

  static childContextTypes = {
    ctx: PropTypes.object
  };

  getChildContext() {
    return {
      ctx: this.state.ctx
    };
  }

  render() {
    return <canvas>{this.state.children}</canvas>;
  }
  componentDidMount() {
    this.setState({
      children: this.props.children,
      ctx: ReactDOM.findDOMNode(this).getContext("2d")
    });
  }
}

class Point extends Component {
  static contextTypes = {
    ctx: PropTypes.object
  };
  render() {
    const { ctx } = this.context;

    /* ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill(); */
    return <>{this.props.children}</>;
  }
}

class Arc extends Component {
  render() {
    const { ctx } = this.context;
    return <>{this.props.children}</>;
  }
}

class Path extends Component {
  static contextTypes = {
    ctx: PropTypes.object
  };
  render() {
    const { ctx } = this.context;
    ctx.beginPath();
    this.props.children.forEach(item => {
      if (item.type === Point) {
        ctx.lineTo(item.props.x, item.props.y);
        ctx.pos = { x: item.props.x, y: item.props.y };
      } else if (item.type === Arc) {
        ctx.arc(
          ctx.pos.x,
          ctx.pos.y,
          item.props.r,
          item.props.from,
          item.props.to,
          false
        );
      }
    });
    ctx.closePath();
    ctx.stroke();
    return this.props.children;
  }
}

export class Rect extends Component {
  static contextTypes = {
    ctx: PropTypes.object
  };
  render() {
    const { ctx } = this.context;
    const { x, y, width, height } = this.props;
    ctx.strokeRect(x, y, width, height);
    return <>{this.props.children}</>;
  }
}

class MyConponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 20,
      y: 30
    };
  }
  render() {
    return (
      <>
        <Canvas>
          <Rect x={20} y={30} width={50} height={100} />
          <Path>
            <Point name="line1" x={this.state.x} y={this.state.y} />
            <Point name="line2" x={100} y={80} />
            <Arc r={15} from={0} to={2 * Math.PI} />
          </Path>
        </Canvas>
      </>
    );
  }
}

export default MyConponent;
