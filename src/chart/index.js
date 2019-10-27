import React, { Component } from "react";
import { Svg, Line, Point, PolyLine, Rect, Text } from "../canvas/svg";

class Grid extends Component {
  render() {
    let line = [];
    for (let i = 1; i < 11; i++) {
      line.push(
        <>
          <Line>
            <Point x={100} y={400 - i * 30} />
            <Point x={400} y={400 - i * 30} />
          </Line>
          <Line strokeWidth={1} stroke={"#ff6600"}>
            <Point x={100 + i * 30} y={100} />
            <Point x={100 + i * 30} y={400} />
          </Line>
        </>
      );
    }
    return <>{line}</>;
  }
}

const color = ["green", "red", "purple", "orage"];

class Legend extends Component {
  color = color;
  render() {
    const { data, color } = this.props;
    let nodes = data.map((item, index) => (
      <>
        <Rect
          x={100 + index * 70}
          y={30}
          width={50}
          height={20}
          style={{ fill: color[index] }}
        />
        <Text
          x={100 + index * 70}
          y={30}
          width={50}
          height={20}
          style={{ fill: color[index] }}
        >
          {item}
        </Text>
      </>
    ));
    return nodes;
  }
}

class BarChart extends Component {
  color = color;
  render() {
    const { data } = this.props;
    return (
      <div style={{ width: "500px", height: "500px" }}>
        <Svg>
          <Line>
            <Point x={100} y={400} />
            <Point x={400} y={400} />
          </Line>
          <Line>
            <Point x={100} y={100} />
            <Point x={100} y={400} />
          </Line>
          {data.map((item, index) => (
            <Rect
              x={100 + index * 100}
              y={400 - item}
              width={50}
              height={item}
              style={{ fill: this.color[index] }}
            />
          ))}
          {data.map((item, index) => (
            <Rect
              x={100 + index * 100}
              y={20}
              width={50}
              height={20}
              style={{ fill: this.color[index] }}
            />
          ))}
          {data.map((item, index) => (
            <Text
              x={100 + index * 100}
              y={20}
              width={50}
              height={20}
              style={{ fill: this.color[index] }}
            >
              {item}
            </Text>
          ))}
          {this.props.children}
        </Svg>
      </div>
    );
  }
}

class Chart extends Component {
  render() {
    return (
      <BarChart data={[100, 150, 200, 300]} legend={["手机", "手环", "电视"]}>
        <Grid />
        <Legend data={["第一周", "第二周", "第三周", "第四周"]} />
        {/* <XAxis/>
         <YAxis/> */}
      </BarChart>
    );
  }
}

export default Chart;
