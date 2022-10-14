import { useState } from "react";
import { TimeFilter } from "src/types/interfaces";
import Coordinates from "../atoms/Coordinates";
import DayFilter from "../atoms/DayFilter";
import FilterButton from "../atoms/FilterButton";
import MonthFilter from "../atoms/MonthFilter";
import YearFilter from "../atoms/YearFilter";
import ChartDaddy from "../charting/chart";
import Card from "../molecules/Card";
import LeftOverlayBar from "../molecules/LeftOverlayBar";
import SmallCard from "../molecules/SmallCard";

function PrimeAnalytics() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>({
    year: "",
    month: "",
    day: "",
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

  console.log("Time Filter: ", timeFilter.year);

  return (
    <div className="flex w-full relative">
      <LeftOverlayBar />
      <Card
        classes={
          "w-1/4 md:min-h-[800px] self-start flex flex-col items-start justify-start"
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
            text={timeFilter.day}
            category={"day"}
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
          {timeFilter.day ? null : (
            <DayFilter timeFilter={timeFilter} action={handleClick} />
          )}
        </div>
      </Card>
      <Card
        classes={
          "w-full md:min-h-[800px] md:h-[800px] ml-2 self-start font-dogica-bold"
        }
      >
        <ChartDaddy />
      </Card>
      <div className="absolute -top-5 -right-2 w-24 h-24">
        <Coordinates />
      </div>
    </div>
  );
}

export default PrimeAnalytics;
