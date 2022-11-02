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
import d from "./assets/outputtest.txt";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0.725,
    },
    line: {
      borderWidth: 0.9,
    },
    tension: 0,
  },
  plugins: {
    legend: {
      position: "top" as const,
      align: "left",
    },
    title: {
      display: false,
      text: "",
    },
    annotation: {
      annotations: {
        point1: {
          type: "point",
          xValue: 100,
          yValue: 2000,
          backgroundColor: "rgba(255, 99, 132, 0.95)",
        },
      },
    },
  },
};

export const generateLabels = (dataSetSize: number) => {
  let labels: number[] = [];
  if (!dataSetSize || isNaN(dataSetSize)) return [1, 2, 3];
  [...Array(Math.abs(dataSetSize)).keys()].map((i) => labels.push(i));
  return labels;
};

const dataAmount = 1000;
const labels = generateLabels(dataAmount);
const dataPoints = generateLabels(dataAmount);

export const data = {
  labels,
  datasets: [
    {
      label: "SEND IT",
      data: [5000],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export function LineChart() {
  const [chartData, setChartData] = useState<any>(null);
  const [_, setShit] = useState();

  useEffect(() => {
    fetch(d)
      .then((r) => r.text())
      .then((text) => {
        let newText = text.trim().split(",");
        let newData = data;

        newData.datasets[0].data = newText
          .splice(9500, dataAmount)
          .map((d) => parseInt(d));
        setChartData(newData);
      });
  }, []);

  // With the data, identify all outstanding upper points, this will be our R of the QRS wave.
  const workWithData = chartData?.datasets[0]?.data;
  if (workWithData) {
    let highestPoints: any[] = [];
    let currentHighestPoint: number = 0;
    let windowSize: number = 100;
    let count: number = 0;

    workWithData.map((dataPoint: number) => {
      if (count >= windowSize) {
        highestPoints.push(currentHighestPoint);
        count = 0;
      }

      if (dataPoint > currentHighestPoint) {
        currentHighestPoint = dataPoint;
      }

      count++;
    });

    console.log("highestPoints:", highestPoints);
  }

  if (!chartData) return null;
  return <Line options={options} data={chartData} />;
}
