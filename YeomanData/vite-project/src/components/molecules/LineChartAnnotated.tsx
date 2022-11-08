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
} from "../../utils/helpers";
import annotationPlugin from "chartjs-plugin-annotation";
import { ChartLine } from "../../components/atoms/ChartLine";
import { calculateMovingAverage } from "../../utils/MovingWindowAverage";
import { getFullSegment, getWaveSegmentLines } from "../../utils/WaveAnalysis";
import LoadingSpinner, { LoadingSpinnerSize } from "../atoms/LoadingSpinner";

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

export function LineChartAnnotated({
  chartData,
  setWaveSegments,
}: {
  chartData: any;
  setWaveSegments: Function;
}) {
  const [chartOptions, setChartOptions] = useState<any>(options);
  let { data: chartDataArr, labels } = chartData;

  let heartWaveSegments: any[] = findQRSWave(chartDataArr, dataPointsTotal);
  const overlayBoxes: any[] = [];
  heartWaveSegments.map((heartWaveDataSet: any) => {
    let x = getBoxesAndLabelsForData(heartWaveDataSet);
    overlayBoxes.push(...x);
  });

  const fullHeartSegments = getFullSegment(chartDataArr, heartWaveSegments);
  const waveSegments = getWaveSegmentLines(fullHeartSegments);

  const runChartSetup = () => {
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
    runChartSetup();
    setWaveSegments({ waveSegments });
  }, [chartData]);

  console.log("chartData: ", chartData?.data);

  const data = {
    labels,
    datasets: [...chartData?.data],
  };

  if (chartData?.data.length <= 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner size={LoadingSpinnerSize.LARGE} />
      </div>
    );
  }

  return (
    <div className="h-full">
      <ChartLine chartOptions={chartOptions} data={data} />
    </div>
  );
}
