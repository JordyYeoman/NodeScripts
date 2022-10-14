import { TimeFilter } from "src/types/interfaces";
import SmallCard from "../molecules/SmallCard";

const Days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DayFilter = ({
  timeFilter,
  action,
}: {
  timeFilter: TimeFilter;
  action: Function;
}) => {
  return (
    <div className="flex flex-col">
      <div>Day</div>
      <div className="flex flex-row flex-wrap">
        {Days.map((day) => {
          return (
            <SmallCard
              attr={"day"}
              name={day}
              key={day}
              classes={`ml-0 m-1 ${
                timeFilter.day === day ? "bg-zinc-600" : ""
              }`}
              action={action}
            >
              {day}
            </SmallCard>
          );
        })}
      </div>
    </div>
  );
};

export default DayFilter;
