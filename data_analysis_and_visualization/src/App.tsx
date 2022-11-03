import { useEffect, useState } from "react";
import "./App.css";
import LineChart from "./LineChart";
import MultilineChart from "./MultiLineChart";
import d from "./assets/outputtest.txt";
//
import schc from "../src/assets/SCHC.json";
import vcit from "../src/assets/VCIT.json";
import portfolio from "../src/assets/portfolio.json";

const portfolioData = { name: "Portfolio", color: "#ffffff", items: portfolio };
const schcData = { name: "SCHC", color: "#d53e4f", items: schc };
const vcitData = { name: "VCIT", color: "#5e4fa2", items: vcit };
const dimensions = {
  width: 600,
  height: 300,
  margin: { top: 30, right: 30, bottom: 30, left: 60 },
};
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
        <LineChart data={chartData} />
        {/* <MultilineChart data={[schcData, vcitData]} dimensions={dimensions} /> */}
      </div>
    </div>
  );
}

export default App;
