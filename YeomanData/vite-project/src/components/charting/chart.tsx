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
import { useAppContext } from "../../AppWrapper";
import { generateData, getTxtFileDataAsArray } from "../../utils/dataUtils";
import { calculateMovingAverage } from "../../utils/MovingWindowAverage";

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

const labels = generateData(15000);

const ChartDaddy = () => {
  const [startSplice, setStartSplice] = useState<number>(0);
  const [endSplice, setEndSplice] = useState<number>(0);
  // Get the value and setter from the consumer hook
  const { ironHeartData, setIronHeartData } = useAppContext();
  const handleNewData = (data: number[], dataSet?: number) => {
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
      getTxtFileDataAsArray(0, 100).then((data) => {
        handleNewData(data.map((dataPoint) => parseFloat(dataPoint)));
      });
    }
  }, []);

  return (
    <div style={styles.wrapDaddy}>
      <input
        type="number"
        id="qty"
        value={startSplice}
        onChange={(inputVal) => {
          setStartSplice(parseInt(inputVal ?? ""));
        }}
      />
      {/* <ToggleChartSection
        title={"Raw"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      /> */}
      <ToggleChartSection
        title={"Moving Window Average"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      />
      {/* <ToggleChartSection
        title={"High Pass Filter"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      /> */}
      <ToggleChartSection
        title={"Low Pass Filter"}
        options={options}
        data={data}
        filterType={ChartFilter.LowPassFilter}
      />
      {/* <ToggleChartSection
        title={"Discrete Fourier Transform"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      />
      <ToggleChartSection
        title={"LPF + HPF"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      />
      <ToggleChartSection
        title={"LPF + HPF + DFT"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      /> */}
    </div>
  );
};

export default ChartDaddy;

export enum ChartFilter {
  MovingWindowAverage,
  HighPassFilter,
  LowPassFilter,
  DiscreteFourierTransform,
  LowPassAndHighPassFilters,
  LowPassHighPassAndDiscreteFourierTransform,
}

const ToggleChartSection = ({
  title,
  options,
  data,
  filterType,
}: {
  title: string;
  options: any;
  data: any;
  filterType: ChartFilter;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const getLineChartForType = () => {
    switch (filterType) {
      case ChartFilter.MovingWindowAverage:
        let newData = calculateMovingAverage(data?.datasets[0]?.data, 15);
        data.datasets[0].data = newData;
        return <Line options={options} data={data} />;
      case ChartFilter.HighPassFilter:
        // let newData =
        data = data;
        break;
      case ChartFilter.LowPassFilter:
        data.datasets[0].data = data;
        return <Line options={options} data={data} />;
      case ChartFilter.DiscreteFourierTransform:
        data = data;
        break;
      case ChartFilter.LowPassAndHighPassFilters:
        data = data;
        break;
      case ChartFilter.LowPassHighPassAndDiscreteFourierTransform:
        data = data;
        break;
      default:
        break;
    }
  };

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
      {open ? <>{getLineChartForType()}</> : <></>}
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
