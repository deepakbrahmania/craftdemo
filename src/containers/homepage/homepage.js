import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart } from "../../common/charts/bar";
import { Transaction } from "../transactions/Transaction";
import {
  getTrendStatus,
  getTrends,
  fetchAllTrends,
} from "../../features/trends/trendSlice";

export const HomePage = () => {
  const trends = useSelector(getTrends);
  const [trendStatus, trendError] = useSelector(getTrendStatus);
  const [trendsData, setTrendsData] = useState([]);
  const dispatch = useDispatch();

  console.log("Updated Trends", trends);

  let chartData;
  useEffect(() => {
    if (trendStatus === "idle") {
      dispatch(fetchAllTrends());
    }
  }, [trendStatus, dispatch]);

  const createTrendsData = (trendData) => {
    setTrendsData([]);
    const transactionData = [...trendData];
    const trendsObj = {};

    transactionData.forEach(transaction => {
      const type = transaction.type;
      if (trendsObj[transaction.timestamp]) {
        trendsObj[transaction.timestamp] = {
          ...trendsObj[transaction.timestamp],
          [type]: (trendsObj[transaction.timestamp][type] || 0) + transaction.amount 
        }
      } else {
        trendsObj[transaction.timestamp] = {timestamp: transaction.timestamp, [type]: transaction.amount };
      }
    });
    const sortedTrends = Object.values(trendsObj).sort((a, b) => a.timestamp - b.timestamp);
    return(sortedTrends);
  }

  useEffect(() => {
    setTrendsData(createTrendsData(trends));
  }, [trends])

  if (trends.length === 0) {
    return "Nothing to display";
  } else if (trendStatus === "pending") {
    return <div>Loading Trends...</div>;
  } else if (trendStatus === "failure") {
    return <div>Error</div>;
  } else {
    console.log(trendStatus, trends);
    chartData = [["Time", "Credited", "Debited"]];
    // const title = trends[0].name;
    const title = 'Trends';
    // setTrendsData(createTrendsData(trends));
    trendsData.map((row) => {
      chartData.push([new Date(row.timestamp).toDateString(), row.credited, row.debited]);
    });
    console.log(chartData);
    return (
      <div style={{padding: '20px'}}>
        <h2 className="text-center">Trends</h2>
        <div className="row flex-col">
          <div className="col">
            <BarChart data={chartData} options={{ title }} />
          </div>
          <div className="col">{<Transaction />}</div>
        </div>
      </div>
    );
  }
};
