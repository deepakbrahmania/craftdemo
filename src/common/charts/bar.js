import React from "react";
import Chart from "react-google-charts";

export const BarChart = ({ data, options, height, width }) => {
  return (
    <Chart
      chartType="Bar"
      width={width || "100%"}
      height={height || "400px"}
      data={data}
      options={options}
    />
  );
};
