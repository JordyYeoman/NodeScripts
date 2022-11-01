import { useEffect, useState } from "react";
import { HeartPayload, TimeFilter } from "src/types/interfaces";
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
import ChartDaddy from "../molecules/LineChart";
import Card from "../molecules/Card";
import LeftOverlayBar from "../molecules/LeftOverlayBar";
import { useAppContext } from "../../AppWrapper";
import { getLatestData } from "../../utils/networkUtils";
import AnalogProcessingPanel from "../molecules/AnalogProcessingPanel";
import { ChartFilter } from "../../types/enums";
import RetrieveDataComponent from "../atoms/RetrieveDataComponent";
import { DataUploadCard } from "../atoms/DataUploadCard";

function PrimeAnalytics() {
  const { ironHeartData, setIronHeartData } = useAppContext();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>({
    year: "",
    month: "",
    date: "",
  });
  const [activeDataPoints, setActiveDataPoints] = useState<number[]>([0]); // Represents index value of chunk count for current payload from server
  const [dataFilter, setDataFilter] = useState<ChartFilter>(ChartFilter.Raw);

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

  useEffect(() => {
    // If data is empty on the initial load
    // make a request for the latest 5 data sets
    if (ironHeartData === 0 || ironHeartData === undefined) {
      // TODO: cache response to prevent refetching
      getLatestData(
        "http://localhost:5000/api/fileUpload/latest",
        setIronHeartData
      );
    } else {
      // If we do have the latest data
      // check the latest filters set and fetch based on those queries
      if (timeFilter?.year && timeFilter?.month && timeFilter?.date) {
        let chunkRange = {
          chunkRangeLower: "0",
          chunkRangeUpper: "100",
        };
        // Make request
        const fetchData = async () => {
          const data = await getShit(timeFilter, chunkRange);
          if (data) {
            setIronHeartData(data?.data);
          }
        };
        fetchData()
          // make sure to catch any error
          .catch(console.error);
      }
    }
  }, [timeFilter.year, timeFilter.month, timeFilter.date]);

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
    <div className="flex w-full relative flex-col mb-16">
      <LeftOverlayBar />
      <Card
        classes={"w-full self-start flex flex-col items-start justify-start"}
      >
        <div className="w-1/2 h-6 text-sm font-bold uppercase flex items-center">
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
          <div className="w-2/3 pr-12">
            <YearFilter timeFilter={timeFilter} action={handleClick} />
            <MonthFilter timeFilter={timeFilter} action={handleClick} />
            <DateFilter timeFilter={timeFilter} action={handleClick} />
          </div>
          <div className="w-1/3">
            <AnalogProcessingPanel
              setFilter={setDataFilter}
              currentFilter={dataFilter}
            />
            <div>
              <DataUploadCard />
            </div>
          </div>
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
          "h-[700px] max-w-full w-full xl:h-[900px] mt-2 self-start overflow-hidden"
        }
      >
        <ChartDaddy selectedData={activeDataPoints} dataFilter={dataFilter} />
      </Card>
      <div className="absolute -top-5 -right-2 w-24 h-24">
        <Coordinates />
      </div>
    </div>
  );
}

export default PrimeAnalytics;

const getShit = async (
  timeFilter: any,
  chunkRange: any
): Promise<undefined | HeartPayload> => {
  let dateRange = generateDataFilterString(
    timeFilter?.year,
    timeFilter?.month,
    timeFilter?.date
  );
  const filterData = new FormData();
  let { chunkRangeLower, chunkRangeUpper } = chunkRange;
  // Implement a limit for data chunks to prevent app slowing too much when charting > 10 line charts
  if (parseInt(chunkRangeUpper) - parseInt(chunkRangeLower) > 10) {
    chunkRangeUpper = (parseInt(chunkRangeLower) + 9).toString();
  }
  filterData.append("dateRangeUpper", dateRange.dateRangeUpper);
  filterData.append("dateRangeLower", dateRange.dateRangeLower);
  filterData.append("chunkRangeLower", chunkRangeLower);
  filterData.append("chunkRangeUpper", chunkRangeUpper);
  try {
    const response = await fetch("http://localhost:5000/api/fileUpload/data", {
      method: "POST",
      body: filterData,
      headers: getApiFormHeaders(),
    });

    if (response.status === 200) {
      const result_2 = await response.json();
      return result_2;
    }
    return { data: [] }; // Return empty array if status != 200
  } catch (error) {
    console.error("Error:", error);
  }
};
