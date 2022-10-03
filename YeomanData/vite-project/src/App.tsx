import { useState } from "react";
import { AppWrapper } from "./AppWrapper";
import reactLogo from "./assets/react.svg";
import ChartDaddy from "./components/charting/chart";
function App() {
  const [count, setCount] = useState(0);

  return (
    <AppWrapper>
      <div className="App">
        <div className="mainContent">
          <h1 style={styles.heading}>IRON HEART</h1>
          <button
            onClick={async () => {
              setCount((count) => count + 1);
            }}
          >
            count is {count}
          </button>
          <ChartDaddy />
        </div>
      </div>
    </AppWrapper>
  );
}

export default App;

const styles = {
  heading: {
    fontWeight: "900",
    fontSize: 72,
    textShadow: "5px 2.5px rgba(0, 192, 250,0.8)",
  },
};
