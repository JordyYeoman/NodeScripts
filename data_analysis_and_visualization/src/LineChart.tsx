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
import {
  findQRSWave,
  generateLabels,
  getBoxesAndLabelsForData,
} from "./utils/helpers";
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

export function LineChart({
  chartData,
  setWaveSegments,
}: {
  chartData: any;
  setWaveSegments: Function;
}) {
  const [chartOptions, setChartOptions] = useState<any>(options);
  let { data: chartDataArr } = chartData;
  const [mwaActive, setMWAActive] = useState<boolean>(false);

  if (mwaActive) {
    chartDataArr = calculateMovingAverage(chartDataArr, 10);
  }

  let heartWaveSegments: any[] = findQRSWave(chartDataArr, chartDataArr.length);
  const overlayBoxes: any[] = [];
  heartWaveSegments.map((heartWaveDataSet: any) => {
    let x = getBoxesAndLabelsForData(heartWaveDataSet);
    overlayBoxes.push(...x);
  });

  const getFullSegment = (originalData: any, heartWaveDataSet: any) => {
    let z = heartWaveDataSet.filter(
      (v: any) => v.segment === "PS" || v.segment === "TE"
    );
    let startPoint = z[0].data;
    let endPoint = z[1].data;
    let waveDataSegments = [];
    for (let i = 0; i < startPoint.length; i++) {
      waveDataSegments.push(originalData.slice(startPoint[i].i, endPoint[i].i));
    }

    return waveDataSegments;
  };

  const fullHeartSegments = getFullSegment(chartDataArr, heartWaveSegments);
  const getWaveSegmentLines = (fullHeartSegments: any[]) => {
    return fullHeartSegments.map((x: number[]) => {
      return {
        label: "Dataset 2",
        data: x,
        borderColor: "rgb(253, 162, 235)",
        backgroundColor: "rgba(253, 162, 235, 0.5)",
      };
    });
  };
  const waveSegments = getWaveSegmentLines(fullHeartSegments);

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
    setWaveSegments({ labels, waveSegments });
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
    <div className="h-full">
      <ChartLine chartOptions={chartOptions} data={data} />
    </div>
  );
}
