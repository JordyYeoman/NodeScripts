import { useState } from "react";
import { AppWrapper } from "./AppWrapper";
import reactLogo from "./assets/react.svg";
import ChartDaddy from "./components/charting/chart";
import Navbar from "./components/Navbar";
function App() {
  const [count, setCount] = useState(0);
  const [fileToUpload, setFileToUpload] = useState(null);
  const handleFile = (event: any) => {
    setFileToUpload(event?.target?.files[0]);
  };
  const uploadFile = () => {
    const formData = new FormData();
    console.log("FILETOUPLOAD: ", fileToUpload);
    if (!fileToUpload) return;

    formData.append("UPLOADED_FILE", fileToUpload);

    fetch("http://localhost:5000/api/fileUpload/", {
      method: "POST",
      body: formData,
      headers: {
        "x-auth-token": "",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getChartDataTest = () => {
    fetch("http://localhost:5000/api/fileUpload/allData", {
      method: "GET",
      headers: {
        "x-auth-token": "",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <AppWrapper>
      <Navbar />
      <div className="App">
        <div className="mainContent">
          <h1 style={styles.heading}>IRON HEART</h1>
          <div style={styles.utils}>
            <button
              onClick={async () => {
                setCount((count) => count + 1);
              }}
            >
              count is {count}
            </button>
            <button onClick={getChartDataTest}>
              get Chart Data from Mongo
            </button>
            <div>
              <label htmlFor="uploaded_file">Upload data: </label>
              <input
                type="file"
                id="uploaded_file"
                name="UPLOADED_FILE"
                accept=".txt,.csv"
                onChange={handleFile}
              />
              <button onClick={uploadFile}>Upload File</button>
            </div>
          </div>
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
  utils: {
    display: "flex",
    justifyContent: "space-between",
  },
};
