import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BasicSynchronizedLineChart = ({
  incomingData,
}: {
  incomingData: any;
}) => {
  let data = [];
  let labels = incomingData?.data?.data;
  if (labels) {
    data = labels.map((d: any, index: number) => {
      return {
        data: d,
        label: index,
      };
    });
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={200}
          data={data}
          //   syncId="anyId" // Uncomment for any linked line charts
          margin={{
            top: 12,
            right: 16,
            left: -32,
            bottom: -10,
          }}
        >
          <CartesianGrid
            strokeDasharray="0 0"
            stroke={"rgba(24, 24, 27, 0.25)"}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 7, fill: "rgb(113 113 122)", fontWeight: "bold" }}
          />
          <YAxis
            domain={["0", "auto"]}
            dataKey="data"
            tick={{ fontSize: 7, fill: "rgb(113 113 122)", fontWeight: "bold" }}
          />
          <Tooltip />
          <Line
            type="linear"
            dataKey="data"
            stroke="rgb(53, 162, 235)"
            fill="rgb(53, 162, 235)"
            dot={{
              fill: "transparent",
              stroke: "rgb(53, 162, 235)",
              strokeWidth: 0.1,
              width: 0,
              r: 1,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BasicSynchronizedLineChart;
