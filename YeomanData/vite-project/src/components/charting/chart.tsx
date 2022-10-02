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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getTxtFileDataAsArray } from "../../utils/readFromFile";

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
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

// const dataSet = ["1", "2", "3", "4", "5"];
const labels = ["January", "February", "March", "April", "May", "June", "July"];

function ChartDaddy() {
  const [dataSet, setDataSet] = useState<any>([]);
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dataSet,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  console.log("YO: ", data);
  useEffect(() => {
    getTxtFileDataAsArray().then((data) => {
      setDataSet(data);
    });
  }, [data]);

  return (
    <div style={styles.wrapDaddy}>
      <Line options={options} data={data} />
    </div>
  );
}

export default ChartDaddy;

const styles = {
  wrapDaddy: {
    display: "flex",
    marginTop: 24,
  },
};
