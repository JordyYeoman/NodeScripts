import { useEffect, useState } from "react";
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
import { findQRSWave, generateLabels, getBoxesForData } from "./utils/helpers";
import annotationPlugin from "chartjs-plugin-annotation";
import { ChartLine } from "./components/atoms/ChartLine";
import { calculateMovingAverage } from "./utils/MovingWindowAverage";
import { getSmoothedData } from "./utils/SmoothAverage";

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
      borderWidth: 1.2,
    },
    tension: 0,
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Testing Annotations Data Set",
    },
    autocolors: false,
    annotation: {
      annotations: {},
    },
  },
};

const dataPointsTotal = 500;
const labels = generateLabels(dataPointsTotal);

export function LineChart({ chartData }: { chartData: any }) {
  const [chartOptions, setChartOptions] = useState<any>(options);
  let { data: chartDataArr } = chartData;
  const [mwaActive, setMWAActive] = useState<boolean>(false);

  if (mwaActive) {
    chartDataArr = calculateMovingAverage(chartDataArr, 10);
  }

  let heartWaves = findQRSWave(chartDataArr, chartDataArr.length);
  const overlayBoxes = getBoxesForData(heartWaves);

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
  }, [chartData, mwaActive]);

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: mwaActive
          ? chartDataArr
          : chartData?.data.length > 0
          ? chartData?.data
          : labels,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <ChartLine chartOptions={chartOptions} data={data} />
      <button onClick={() => setMWAActive(!mwaActive)}>Toggle MWA</button>
    </>
  );
}
