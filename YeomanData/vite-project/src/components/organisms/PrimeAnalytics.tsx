import { useState } from "react";
import { TimeFilter } from "src/types/interfaces";
import { generateDataFilterString } from "../../utils/dataUtils";
import { getApiHeaders, getUploadHeaders } from "../../utils/auth";
import Coordinates from "../atoms/Coordinates";
import DateFilter from "../atoms/DateFilter";
import DayFilter from "../atoms/DayFilter";
import FilterButton from "../atoms/FilterButton";
import MonthFilter from "../atoms/MonthFilter";
import YearFilter from "../atoms/YearFilter";
import ChartDaddy from "../charting/chart";
import Card from "../molecules/Card";
import LeftOverlayBar from "../molecules/LeftOverlayBar";

function PrimeAnalytics() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>({
    year: "",
    month: "",
    date: "",
  });

  const handleClick = (e: any) => {
    const filterCat = e.target.getAttribute("data-attr");
    const filterName = e.target.getAttribute("data-name");
    setTimeFilter((currentValues) => ({
      ...currentValues,
      [filterCat]: filterName,
    }));
  };

  const handleResetVal = (filterCat: string) => {
    setTimeFilter((currentValues) => ({
      ...currentValues,
      [filterCat]: "",
    }));
  };

  if (timeFilter?.year && timeFilter?.month && timeFilter?.date) {
    // Dispatch data request action
    let dateRange = generateDataFilterString(
      timeFilter?.year,
      timeFilter?.month,
      timeFilter?.date
    );
    let chunkRange = {
      chunkRangeLower: 0,
      chunkRangeUpper: 2,
    };
    const filterData = new FormData();

    filterData.append("dateRangeUpper", dateRange.dateRangeUpper);
    filterData.append("dateRangeLower", dateRange.dateRangeLower);
    filterData.append("chunkRangeLower", chunkRange.chunkRangeLower.toString());
    filterData.append("chunkRangeUpper", chunkRange.chunkRangeUpper.toString());

    fetch("http://localhost:5000/api/fileUpload/data", {
      method: "POST",
      body: filterData,
      headers: getApiHeaders(),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="flex w-full relative flex-col xl:flex-row mb-16">
      <LeftOverlayBar />
      <Card
        classes={
          "w-full xl:min-h-[900px] self-start flex flex-col items-start justify-start"
        }
      >
        <div className="w-full h-6 text-sm font-bold uppercase flex items-center">
          Filters
          <FilterButton
            text={timeFilter.year}
            category={"year"}
            action={handleResetVal}
          />
          <FilterButton
            text={timeFilter.month}
            category={"month"}
            action={handleResetVal}
          />
          <FilterButton
            text={timeFilter.date}
            category={"date"}
            action={handleResetVal}
          />
        </div>
        <div className="flex flex-wrap h-full w-full">
          {timeFilter.year ? null : (
            <YearFilter timeFilter={timeFilter} action={handleClick} />
          )}
          {timeFilter.month ? null : (
            <MonthFilter timeFilter={timeFilter} action={handleClick} />
          )}
          {timeFilter.date ? null : (
            <DateFilter timeFilter={timeFilter} action={handleClick} />
          )}
        </div>
        <div className="w-full pt-2 h-6 text-sm font-bold uppercase flex items-center">
          Sources
          <div></div>
        </div>
      </Card>
      <Card
        classes={
          "h-[700px] max-w-full xl:h-[900px] mt-2 xl:ml-2 self-start overflow-hidden"
        }
      >
        <ChartDaddy />
      </Card>
      <div className="absolute -top-5 -right-2 w-24 h-24">
        <Coordinates />
      </div>
      <div>
        <DataSources />
      </div>
    </div>
  );
}

export default PrimeAnalytics;

const DataSources = () => {
  const handleFile = (event: any) => {
    setFileToUpload(event?.target?.files[0]);
  };
  const [fileToUpload, setFileToUpload] = useState(null);
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
    <>
      <div className="flex justify-between">
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
  );
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
