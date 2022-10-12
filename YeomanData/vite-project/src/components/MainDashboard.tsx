import { useEffect, useState } from "react";
import { useAppContext } from "../AppWrapper";
import ChartDaddy from "../components/charting/chart";
import { getApiHeaders } from "../utils/auth";

function MainDashboard() {
  const { user } = useAppContext();
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
      headers: getApiHeaders(),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  console.log("User bra", user);

  return (
    <div className="mainContent">
      {user?.isAuthenticated ? (
        <>
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
        </>
      ) : (
        <>Login Bra</>
      )}
    </div>
  );
}

export default MainDashboard;

const styles = {
  utils: {
    display: "flex",
    justifyContent: "space-between",
  },
};
