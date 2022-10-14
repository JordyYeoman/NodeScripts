import { useState } from "react";
import Coordinates from "../atoms/Coordinates";
import Card from "../molecules/Card";
import LeftOverlayBar from "../molecules/LeftOverlayBar";
import SmallCard from "../molecules/SmallCard";

const Years = [2023, 2022, 2021];
const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface TimeFilter {
  year: string;
  month: string;
  day: string;
}

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

  console.log("Time Filter: ", timeFilter.year);

  return (
    <div className="flex w-full relative">
      <LeftOverlayBar />
      <Card classes={"w-1/4 self-start flex flex-wrap"}>
        <div className="w-full h-6 text-sm font-bold uppercase">Filter</div>
        {Years.map((year) => {
          console.log("Year: ", year);
          console.log("timeFilter.year", parseInt(timeFilter.year));
          return (
            <SmallCard
              attr={"year"}
              name={year}
              key={year}
              classes={`ml-0 m-1 ${
                parseInt(timeFilter.year) === year ? "bg-zinc-600" : ""
              }`}
              action={handleClick}
            >
              {year}
            </SmallCard>
          );
        })}
        {Months.map((month) => {
          return (
            <SmallCard
              attr={"month"}
              name={month}
              key={month}
              classes={`ml-0 m-1 ${
                timeFilter.month === month ? "bg-zinc-600" : ""
              }`}
              action={handleClick}
            >
              {month}
            </SmallCard>
          );
        })}
        {Days.map((day) => {
          return (
            <SmallCard
              attr={"day"}
              name={day}
              key={day}
              classes={`ml-0 m-1 ${
                timeFilter.day === day ? "bg-zinc-600" : ""
              }`}
              action={handleClick}
            >
              {day}
            </SmallCard>
          );
        })}
      </Card>
      <Card classes={"w-full ml-2 self-start font-dogica-bold"}>
        123.22 1241 2150935.0235
      </Card>
      <div className="absolute -top-5 -right-2 w-24 h-24">
        <Coordinates />
      </div>
    </div>
  );
}

export default PrimeAnalytics;
