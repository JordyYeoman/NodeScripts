import React, { useEffect, useState } from "react";
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
import {
  findQRSWave,
  generateData,
  generateLabels,
  getBoxesForData,
} from "./utils/helpers";
import annotationPlugin from "chartjs-plugin-annotation";
import { ChartLine } from "./components/atoms/ChartLine";

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
      annotations: {},
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

const dataPointsTotal = 500;
const labels = generateLabels(dataPointsTotal);
// const labels1 = generateData(dataPointsTotal);
// const labels2 = generateData(dataPointsTotal);

export function LineChart({ chartData }: { chartData: any }) {
  const [chartOptions, setChartOptions] = useState<any>(options);
  const { data: chartDataArr } = chartData;
  // console.log("chartData", chartDataArr);
  // let dataSize = chartData?.data?.length > 0 ? chartData?.data?.length : 500;
  //   let newLabels = generateLabels(dataSize);

  let x = findQRSWave(chartDataArr, dataPointsTotal);
  const overlayBoxes = getBoxesForData(x);
  console.log(overlayBoxes);

  const doStuff = () => {
    setChartOptions({
      ...chartOptions,
      plugins: {
        ...chartOptions.plugins,
        annotation: {
          annotations: {
            ...overlayBoxes,
          },
        },
      },
    });
  };

  useEffect(() => {
    doStuff();
  }, [chartData]);

  // console.log("rendered....");
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: chartData?.data.length > 0 ? chartData?.data : labels,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <ChartLine chartOptions={chartOptions} data={data} />;
}
