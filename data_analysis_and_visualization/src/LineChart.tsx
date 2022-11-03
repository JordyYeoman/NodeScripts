import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { findQRSWave, generateData, generateLabels } from "./utils/helpers";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0.025,
    },
    line: {
      borderWidth: 0.9,
    },
    tension: 0,
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    autocolors: false,
    annotation: {
      annotations: {
        box1: {
          type: "box",
          xMin: 20,
          xMax: 73,
          yMin: 1750,
          yMax: 1900,
          backgroundColor: "rgba(255, 99, 132, 0.25)",
        },
        box2: {
          type: "box",
          xMin: 20,
          xMax: 43,
          yMin: 1350,
          yMax: 1400,
          backgroundColor: "rgba(53, 162, 235, 0.25)",
        },
      },
    },
  },
};

// export interface PluginOptions {

// }

// export interface LineChartOptions {
//     responsive: boolean;
//     maintainAspectRatio: boolean;
//     plugins: PluginOptions;
// }

const dataPointsTotal = 1000;
const labels = generateLabels(dataPointsTotal);
// const labels1 = generateData(dataPointsTotal);
// const labels2 = generateData(dataPointsTotal);

export function LineChart({ chartData }: { chartData: any }) {
  const { data: chartDataArr } = chartData;
  console.log("chartData", chartDataArr);
  let dataSize = chartData?.data?.length > 0 ? chartData?.data?.length : 500;
  //   let newLabels = generateLabels(dataSize);

  let x = findQRSWave(chartDataArr);
  console.log(x);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: chartData?.data.length > 0 ? chartData?.data : labels,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: chartData?.data.length > 0 ? chartData?.data : labels,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
