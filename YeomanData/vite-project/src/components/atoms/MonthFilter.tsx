import { TimeFilter } from "src/types/interfaces";
import SmallCard from "../molecules/SmallCard";

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

const MonthFilter = ({
  timeFilter,
  action,
}: {
  timeFilter: TimeFilter;
  action: Function;
}) => {
  return (
    <div className="flex flex-col">
      <div>Month</div>
      <div className="flex flex-row flex-wrap">
        {Months.map((month) => {
          return (
            <SmallCard
              attr={"month"}
              name={month}
              key={month}
              classes={`ml-0 m-1 ${
                timeFilter.month === month ? "bg-zinc-600" : ""
              }`}
              action={action}
            >
              {month}
            </SmallCard>
          );
        })}
      </div>
    </div>
  );
};

export default MonthFilter;
