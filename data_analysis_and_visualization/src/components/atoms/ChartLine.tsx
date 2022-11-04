import { useEffect } from "react";
import { Line } from "react-chartjs-2";

export const ChartLine = ({
  chartOptions,
  data,
}: {
  chartOptions: any;
  data: any;
}) => {
  return <Line options={chartOptions} data={data} />;
};
