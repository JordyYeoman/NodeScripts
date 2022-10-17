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
import { options } from "../../config/chartOptions";
import { useAppContext } from "../../AppWrapper";
import { generateLabels, getTxtFileDataAsArray } from "../../utils/dataUtils";
import { calculateMovingAverage } from "../../utils/MovingWindowAverage";
import SmallCard from "../molecules/SmallCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartDaddy = () => {
  const [startSplice, setStartSplice] = useState<string>("0");
  const [endSplice, setEndSplice] = useState<string>("500");
  const [labels, setLabels] = useState<number[]>([0]);
  // Get the value and setter from the consumer hook
  const { ironHeartData, setIronHeartData } = useAppContext();
  const handleNewData = (data: number[], dataSet?: number) => {
    setLabels(generateLabels(parseInt(endSplice) - parseInt(startSplice)));
    setIronHeartData(data);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Raw",
        data: ironHeartData,
        borderColor: "rgb(99, 255, 132)",
        backgroundColor: "rgba(99, 255, 132, 0.5)",
      },
      {
        label: "MWA",
        data: calculateMovingAverage(ironHeartData, 15),
        borderColor: "rgb(255, 132, 99)",
        backgroundColor: "rgba(99, 132, 99, 0.9)",
      },
    ],
  };

  useEffect(() => {
    getTxtFileDataAsArray(parseInt(startSplice, parseInt(endSplice))).then(
      (data) => {
        // handleNewData(data.map((dataPoint) => parseFloat(dataPoint)));
      }
    );
  }, [endSplice]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full h-6 text-sm font-bold uppercase flex items-center">
        Analytics
      </div>
      <div className="flex flex-row py-2 w-full flex-wrap">
        {Object.keys(ChartFilter).map((filter) => {
          return (
            <SmallCard key={filter} classes={"mr-1 w-min"}>
              {filter}
            </SmallCard>
          );
        })}
      </div>
      <div className="flex relative h-full w-full">
        <ChartSection
          title={"Raw"}
          options={options}
          data={data}
          filterType={ChartFilter.Raw}
        />
      </div>
    </div>
  );
};

export default ChartDaddy;

export enum ChartFilter {
  Raw = "raw",
  MovingWindowAverage = "mwa",
  HighPassFilter = "high pass",
  LowPassFilter = "low pass",
  DiscreteFourierTransform = "dft",
  LowPassAndHighPassFilters = "low pass & high pass",
  LowPassHighPassAndDiscreteFourierTransform = "LP, HP & DFT",
}

const ChartSection = ({
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
  const [open, setOpen] = useState<boolean>(true);

  const getLineChartForType = () => {
    switch (filterType) {
      case ChartFilter.Raw:
        return <Line options={options} data={data} />;
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

  return <>{open ? <>{getLineChartForType()}</> : <></>}</>;
};

{
  /* <div>
        <h4 style={styles.heading}>Data range selection:</h4>
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.inputField}
          type="number"
          id="qty"
          value={startSplice}
          onChange={handleStartChange}
        />
        <input
          style={styles.inputField}
          type="number"
          id="qty"
          value={endSplice}
          onChange={handleEndChange}
        />
        <button
          className="customButton"
          style={styles.customButton}
          onClick={handleStepForward}
        >
          Step
        </button>
      </div> */
}

{
  /* <ChartSection
        title={"Moving Window Average"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      /> */
}
{
  /* <ChartSection
        title={"High Pass Filter"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      /> */
}
{
  /* <ChartSection
        title={"Low Pass Filter"}
        options={options}
        data={data}
        filterType={ChartFilter.LowPassFilter}
      /> */
}
{
  /* <ChartSection
        title={"Discrete Fourier Transform"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      />
      <ChartSection
        title={"LPF + HPF"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      />
      <ChartSection
        title={"LPF + HPF + DFT"}
        options={options}
        data={data}
        filterType={ChartFilter.MovingWindowAverage}
      /> */
}

// const handleStartChange = (event: any) => {
//   const result = event.target.value.replace(/\D/g, "");
//   setStartSplice(result);
// };

// const handleEndChange = (event: any) => {
//   let result = event.target.value.replace(/\D/g, "");
//   setEndSplice(result);
// };

// const handleStepForward = () => {
//   let newStart = (parseInt(startSplice) + parseInt(startSplice)).toString();
//   let newEnd = (parseInt(endSplice) + parseInt(endSplice)).toString();
//   setEndSplice(newEnd);
//   setStartSplice(newStart);
// };
