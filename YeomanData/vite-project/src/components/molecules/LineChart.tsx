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
import { decompressFromUTF16 } from "async-lz-string";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { options } from "../../config/chartOptions";
import { useAppContext } from "../../AppWrapper";
import { generateLabels, getTxtFileDataAsArray } from "../../utils/dataUtils";
import { calculateMovingAverage } from "../../utils/MovingWindowAverage";
import { random_rgba } from "../../utils/misc";
import { ChartFilter } from "../../types/enums";
import ChartSection from "../atoms/ChartSection";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartDaddy = ({
  dataFilter,
  selectedData,
}: {
  dataFilter: ChartFilter;
  selectedData?: number[];
}) => {
  const { ironHeartData, setIronHeartData } = useAppContext();
  // TODO - Refactor the splice method
  const [startSplice, setStartSplice] = useState<string>("0");
  const [endSplice, setEndSplice] = useState<string>("500");
  const [labels, setLabels] = useState<number[]>(generateLabels(1000));
  const [dataSets, setDataSets] = useState<any>([]);
  // Get the value and setter from the consumer hook

  useMemo;

  useEffect(() => {
    if (ironHeartData.length > 0) {
      const data = ironHeartData.filter((_data: any) =>
        selectedData?.includes(_data.chunkCount)
      );

      // Setup dataset in correct chart format:
      const getFormattedChartData = async () =>
        await Promise.all(
          data.map(async (oldData: any) => {
            return {
              label: "Test " + (Math.random() * 100).toFixed(2),
              data: (await decompressFromUTF16(oldData.data))
                .split(",")
                .slice(0, 5000), // TODO - Add ability to dynamically slice
              borderColor: random_rgba(),
              backgroundColor: "rgba(99, 255, 132, 0.5)",
            };
          })
        );
      getFormattedChartData()
        .then((formatted) => setDataSets(formatted))
        .catch(console.error);
    }
  }, [ironHeartData, selectedData]);

  const data = {
    labels,
    datasets: dataSets.length > 0 ? dataSets : [],
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex relative h-full w-full">
        <ChartSection
          title={dataFilter.toString()}
          options={options}
          data={data}
          filterType={dataFilter}
        />
      </div>
    </div>
  );
};

export default ChartDaddy;

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

//  const handleNewData = (data: number[], dataSet?: number) => {
//    setLabels(generateLabels(parseInt(endSplice) - parseInt(startSplice)));
//    setIronHeartData(data);
//  };

// useEffect(() => {
//   getTxtFileDataAsArray(parseInt(startSplice, parseInt(endSplice))).then(
//     (data) => {
//       // handleNewData(data.map((dataPoint) => parseFloat(dataPoint)));
//     }
//   );
// }, [endSplice]);
