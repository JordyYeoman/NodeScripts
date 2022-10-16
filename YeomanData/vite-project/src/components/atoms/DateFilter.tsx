import { TimeFilter } from "src/types/interfaces";
import SmallCard from "../molecules/SmallCard";

const DateFilter = ({
  timeFilter,
  action,
}: {
  timeFilter: TimeFilter;
  action: Function;
}) => {
  let Dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  if (timeFilter?.month) {
    if (
      ["april", "june", "september", "november"].includes(
        timeFilter?.month.toLowerCase()
      )
    ) {
      Dates.splice(-1);
    } else if (
      ["february", "june", "september", "november"].includes(
        timeFilter?.month.toLowerCase()
      )
    ) {
      // TODO - If necessary, add leap year to calculation
      Dates.splice(-3);
    }
  }
  return (
    <div className="flex flex-col">
      <div>Date</div>
      <div className="flex flex-row flex-wrap">
        {Dates.map((date) => {
          return (
            <SmallCard
              attr={"date"}
              name={date}
              key={date}
              classes={`ml-0 m-1 ${
                timeFilter.date === date.toString() ? "bg-zinc-600" : ""
              }`}
              action={action}
            >
              {date}
            </SmallCard>
          );
        })}
      </div>
    </div>
  );
};

export default DateFilter;
