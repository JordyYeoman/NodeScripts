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
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useAppContext } from "../../AppWrapper";
import { generateData, getTxtFileDataAsArray } from "../../utils/dataUtils";

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
  elements: {
    point: {
      radius: 0.5,
    },
    line: {
      borderWidth: 0.99,
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
  },
};

// const dataSet = ["1", "2", "3", "4", "5"];
const labels = generateData(5000);

const ChartDaddy = () => {
  // Get the value and setter from the consumer hook
  const { ironHeartData, setIronHeartData } = useAppContext();
  const handleNewData = (data: any[], dataSet?: number) => {
    setIronHeartData(data);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: ironHeartData,
        borderColor: "rgb(99, 255, 132)",
        backgroundColor: "rgba(99, 255, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    if (ironHeartData === 0) {
      getTxtFileDataAsArray().then((data) => {
        handleNewData(data);
      });
    }
  }, []);

  return (
    <div style={styles.wrapDaddy}>
      <ShowHideChart title={"Raw"} options={options} data={data} />
      <ShowHideChart
        title={"Moving Window Average"}
        options={options}
        data={data}
      />
      <ShowHideChart title={"High Pass Filter"} options={options} data={data} />
      <ShowHideChart title={"Low Pass Filter"} options={options} data={data} />
      <ShowHideChart
        title={"Discrete Fourier Transform"}
        options={options}
        data={data}
      />
      <ShowHideChart title={"LPF + HPF"} options={options} data={data} />
      <ShowHideChart title={"LPF + HPF + DFT"} options={options} data={data} />
    </div>
  );
};

export default ChartDaddy;

const ShowHideChart = ({
  title,
  options,
  data,
}: {
  title: string;
  options: any;
  data: any;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div style={styles.headingContainer}>
        <h4>{title}</h4>
        <button
          style={styles.button}
          onClick={async () => {
            setOpen(!open);
          }}
        >
          IsOpen: {open ? "Open" : "Closed"}
        </button>
      </div>
      {open ? (
        <>
          <Line options={options} data={data} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = {
  wrapDaddy: {
    display: "flex",
    marginTop: 24,
    width: "100%",
    marginBottom: 48,
    flexDirection: "column",
  },
  button: {
    maxWidth: 200,
    marginLeft: 24,
  },
  headingContainer: {
    display: "flex",
    alignItems: "center",
  },
};
