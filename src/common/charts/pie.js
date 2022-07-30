import React from "react";
import Chart from "react-google-charts";

export const PieChart = ({data, options, width, height}) => {
  return <Chart 
    chartType="PieChart"
    data={data}
    options={options}
    width={width ||"100%"}
    height={height || "400px"}
  />
}