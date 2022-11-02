import { useState } from "react";
import "./App.css";
import { LineChart } from "./LineChart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App flex flex-col items-center justify-center">
      Send it
      <div className="w-[1500px] h-[800px] bg-zinc-800 rounded p-4 mt-2">
        <LineChart />
      </div>
    </div>
  );
}

export default App;
