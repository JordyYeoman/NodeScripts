import { useEffect, useState } from "react";
import { useAppContext } from "../AppWrapper";
import ChartDaddy from "../components/charting/chart";
import { getApiHeaders, getUploadHeaders } from "../utils/auth";
import Card from "./molecules/Card";
import PrimeAnalytics from "./organisms/PrimeAnalytics";

function MainDashboard() {
  const { user } = useAppContext();
  const [count, setCount] = useState(0);
  const [fileToUpload, setFileToUpload] = useState(null);
  const handleFile = (event: any) => {
    setFileToUpload(event?.target?.files[0]);
  };
  const uploadFile = () => {
    const formData = new FormData();
    if (!fileToUpload) return;

    formData.append("UPLOADED_FILE", fileToUpload);
    console.log("File to upload: ", fileToUpload);

    fetch("http://localhost:5000/api/fileUpload/", {
      method: "POST",
      body: formData,
      headers: getUploadHeaders(),
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
    <div className="mainContent">
      <PrimeAnalytics />
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
          <RetrieveDataComponent />
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

const RetrieveDataComponent = () => {
  //   const [dataRange, setDataRange] = useState<>;
  // Current Data Should be a section of 5 sets of data
  // You should be able to step through each dataset.
  // IE - If you have 0-4, you can then go get 5-9, 10-14 etc etc...
  return (
    <div>
      <div>Get Data From Mongo</div>
      <div>
        <button onClick={getChartDataTest}>Get Chart Data from DB</button>
      </div>
    </div>
  );
};
