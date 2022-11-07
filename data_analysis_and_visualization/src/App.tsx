import { useEffect, useState } from "react";
import "./App.css";
import d from "./assets/outputtest.txt";
import BasicLineChart from "./BasicLineChart";
import { LineChart } from "./LineChart";

const dataAmount = 5000;
const spliceFromIndex = 10371;

export interface DataLayer {
  data: number[];
  labels: number[];
}
function App() {
  const [count, setCount] = useState(0);
  const [chartData, setChartData] = useState<DataLayer>({
    data: [],
    labels: [],
  });

  // Fetch data and update state
  useEffect(() => {
    fetch(d)
      .then((r) => r.text())
      .then((text) => {
        try {
          let newData = text
            .trim()
            .split(",")
            .splice(spliceFromIndex, dataAmount)
            .map((d) => parseInt(d));
          let xLabels = [...Array(dataAmount).keys()].map((k) => k);
          let d = {
            data: newData,
            labels: xLabels,
          };
          setChartData(d);
        } catch (e) {
          console.log(
            "Error ----------------------------------------------------------------"
          );
        }
      });
  }, []);

  if (chartData.data.length <= 0) {
    return <div>Loading....</div>;
  }
  return (
    <div className="App flex flex-col items-center justify-center w-full h-auto">
      Welcome Sir
      <DataVisuals chartData={chartData} />
    </div>
  );
}

export default App;

export const DataVisuals = ({ chartData }: { chartData: DataLayer }) => {
  const [waveData, setWaveData] = useState<any>({
    labels: undefined,
    data: undefined,
  });
  const { labels, waveSegments } = waveData;

  return (
    <>
      <div className="overflow-hidden w-full flex flex-col xl:flex-row">
        <div className={`rounded w-full h-[750px] bg-zinc-800 xl:w-2/3`}>
          <LineChart chartData={chartData} setWaveSegments={setWaveData} />
        </div>
        <div
          className={`flex flex-row w-full xl:flex-col transition duration-300 xl:w-1/3 xl:h-[750px]`}
        >
          {waveSegments &&
            waveSegments.map((data: any, index: number) => {
              if (index < 3) {
                return (
                  <SmallWaveBox
                    key={index}
                    index={index}
                    data={data}
                    labels={labels}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>
    </>
  );
};

export const SmallWaveBox = ({
  data,
  index,
  labels,
}: {
  data: any;
  index: number;
  labels: any;
}) => {
  return (
    <div
      className={`rounded w-1/3 h-[250px] bg-zinc-800 m-1 ml-0 xl:w-full xl:h-1/3 xl:ml-1 mb-0 mt-1 ${
        index === 0 ? "xl:mt-0" : ""
      } ${index === 2 ? "mr-0" : ""}`}
    >
      <BasicLineChart incomingData={{ labels, data }} />
    </div>
  );
};
