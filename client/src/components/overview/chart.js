import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeries
} from "react-vis";
import "./chart-style.css";

const Chart = props => {
  const dataArray = props.data.map(currentDataPoint => {
    const date = new Date(currentDataPoint.date);
    var dateString = date.getDate() + "/" + (date.getMonth() + 1);

    return {
      x: dateString,
      y: currentDataPoint.rating
    };
  });

  return (
    <XYPlot className="XYPlot" width={700} height={350} xType="ordinal">
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="Date" tickLabelAngle={-45} />
      <YAxis title="Rating" />
      <LineMarkSeries
        className="linemark-series-example"
        style={{
          strokeWidth: "3px"
        }}
        lineStyle={{ stroke: "red" }}
        markStyle={{ stroke: "blue" }}
        data={dataArray}
      />
    </XYPlot>
  );
};

export default Chart;
