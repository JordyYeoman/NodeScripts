import { getApiHeaders } from "../../utils/auth";

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

export default RetrieveDataComponent;
