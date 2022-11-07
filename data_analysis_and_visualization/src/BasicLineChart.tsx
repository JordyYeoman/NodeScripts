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
  console.log("labels", incomingData.labels);
  console.log("data", incomingData.data.data);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={200}
          data={incomingData.data.data ?? null}
          //   syncId="anyId" - Uncomment for any linked line charts
          margin={{
            top: 12,
            right: 16,
            left: -32,
            bottom: -10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="incomingData.labels"
            tick={{ fontSize: 7, fill: "black", fontWeight: "bold" }}
          />
          <YAxis
            dataKey="incomingData.data.data"
            tick={{ fontSize: 7, fill: "black", fontWeight: "bold" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="incomingData.data.data"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BasicSynchronizedLineChart;
