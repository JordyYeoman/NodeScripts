import { useEffect, useState } from "react";
import "./App.css";
import d from "./assets/outputtest.txt";
import { LineChart } from "./LineChart";

const dataAmount = 1000;
const spliceFromIndex = 9371;

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

  useEffect(() => {
    console.log("[DEBUG] are you not running?");
  });

  // Fetch data and update state
  useEffect(() => {
    console.log("[DEBUG] running?");
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

  // console.log("chart data in app.tsx", chartData);
  return (
    <div className="App flex flex-col items-center justify-center">
      Welcome Sir
      <div className="w-[1500px] h-[800px] bg-zinc-800 rounded p-4 mt-2">
        <LineChart chartData={chartData} />
      </div>
    </div>
  );
}

export default App;
