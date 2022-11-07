import { useEffect, useState } from 'react';
import './App.css';
import d from './assets/outputtest2.txt';
import { LineChart } from './LineChart';

const dataAmount = 5000;
const spliceFromIndex = 0; // 10371;

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
            .split(',')
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
            'Error ----------------------------------------------------------------'
          );
        }
      });
  }, []);

  if (chartData.data.length <= 0) {
    return <div>Loading....</div>;
  }
  // console.log("chart data in app.tsx", chartData);
  return (
    <div className='App flex flex-col items-center justify-center'>
      Welcome Sir
      <div className='h-[700px] w-[1000px] bg-zinc-800 rounded p-4 mt-2'>
        <LineChart chartData={chartData} />
      </div>
    </div>
  );
}

export default App;
