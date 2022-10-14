import React from "react";
import { TimeFilter } from "src/types/interfaces";
import SmallCard from "../molecules/SmallCard";

const Years = [2023, 2022, 2021, 2020];

const YearFilter = ({
  timeFilter,
  action,
}: {
  timeFilter: TimeFilter;
  action: Function;
}) => {
  return (
    <div className="flex flex-col">
      <div>Year</div>
      <div className="flex flex-row flex-wrap">
        {Years.map((year) => {
          return (
            <SmallCard
              attr={"year"}
              name={year}
              key={year}
              classes={`ml-0 m-1 ${
                parseInt(timeFilter.year) === year ? "bg-zinc-600" : ""
              }`}
              action={action}
            >
              {year}
            </SmallCard>
          );
        })}
      </div>
    </div>
  );
};

export default YearFilter;
