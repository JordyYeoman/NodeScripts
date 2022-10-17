import { useEffect, useState } from "react";
import { TimeFilter } from "src/types/interfaces";
import { generateDataFilterString } from "../../utils/dataUtils";
import {
  getApiFormHeaders,
  getApiHeaders,
  getUploadHeaders,
} from "../../utils/auth";
import Coordinates from "../atoms/Coordinates";
import DateFilter from "../atoms/DateFilter";
import FilterButton from "../atoms/FilterButton";
import MonthFilter from "../atoms/MonthFilter";
import YearFilter from "../atoms/YearFilter";
import ChartDaddy from "../charting/chart";
import Card from "../molecules/Card";
import LeftOverlayBar from "../molecules/LeftOverlayBar";
import { useAppContext } from "../../AppWrapper";
import { getLatestData } from "../../utils/networkUtils";

function PrimeAnalytics() {
  const { ironHeartData, setIronHeartData } = useAppContext();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>({
    year: "",
    month: "",
    date: "",
  });
  const [activeDataPoints, setActiveDataPoints] = useState<number[]>([0]); // Represents index value of chunk count for current payload from server
  const [dateFilterActive, setDateFilterActive] = useState<boolean>(false);

  const handleClick = (e: any) => {
    const filterCat = e.target.getAttribute("data-attr");
    const filterName = e.target.getAttribute("data-name");
    setTimeFilter((currentValues) => ({
      ...currentValues,
      [filterCat]: filterName,
    }));
    if (timeFilter?.year && timeFilter?.month && timeFilter?.date) {
      console.log("we in this bitch");
      setDateFilterActive(true);
    } else {
      setDateFilterActive(false);
    }
  };

  const handleResetVal = (filterCat: string) => {
    setTimeFilter((currentValues) => ({
      ...currentValues,
      [filterCat]: "",
    }));
  };

  // if (dateFilterActive) {
  //   let dateRange = generateDataFilterString(
  //     timeFilter?.year,
  //     timeFilter?.month,
  //     timeFilter?.date
  //   );
  //   let chunkRange = {
  //     chunkRangeLower: "0",
  //     chunkRangeUpper: "2",
  //   };
  //   const filterData = new FormData();

  //   filterData.append("dateRangeUpper", dateRange.dateRangeUpper);
  //   filterData.append("dateRangeLower", dateRange.dateRangeLower);
  //   filterData.append("chunkRangeLower", chunkRange.chunkRangeLower);
  //   filterData.append("chunkRangeUpper", chunkRange.chunkRangeUpper);
  //   console.log("WHATS GOING ON??");
  //   fetch("http://localhost:5000/api/fileUpload/data", {
  //     method: "POST",
  //     body: filterData,
  //     headers: getApiFormHeaders(),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("Success:", result);
  //       // setIronHeartData(result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  useEffect(() => {
    if (ironHeartData === 0 || ironHeartData === undefined) {
      // TODO: cache response to prevent refetching
      getLatestData(
        "http://localhost:5000/api/fileUpload/latest",
        setIronHeartData
      );
    }
  }, []);

  const ToggleDataSet = (index: number) => {
    const _index = activeDataPoints.indexOf(index);
    if (_index >= 0) {
      setActiveDataPoints(
        activeDataPoints.filter((dataPoint) => dataPoint !== index)
      );
      return;
    }
    setActiveDataPoints((prevState) => [...prevState, index]);
  };

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
        <div className="w-full pt-2 text-sm font-bold uppercase flex items-start flex-col">
          Sources
          <div className="flex flex-wrap items-center">
            {ironHeartData.length > 0 &&
              ironHeartData
                .sort((a: any, b: any) => a.chunkCount - b.chunkCount)
                .map((data: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        activeDataPoints.includes(index)
                          ? "border-cyan-400"
                          : "border-transparent"
                      } border border-solid mt-1 bg-zinc-800 text-[8px] transition duration-300 hover:bg-zinc-600 px-2 py-2 rounded mr-1 cursor-pointer`}
                      onClick={() => {
                        ToggleDataSet(index);
                      }}
                    >
                      <div className="flex">
                        <div className="pr-4">
                          Entry: {data?.chunkCount + 1}
                        </div>
                        <div className="font-black text-sky-500">
                          {data?.compressionType}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="">
                          {data?.sizeEstimate.toFixed(2)}MB
                        </div>
                        <div className="bg-zinc-400 py-px px-1 rounded text-[6px] h-[10px] leading-[8px]">
                          Active
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </Card>
      <Card
        classes={
          "h-[700px] max-w-full xl:h-[900px] mt-2 xl:ml-2 self-start overflow-hidden"
        }
      >
        <ChartDaddy selectedData={activeDataPoints} />
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
