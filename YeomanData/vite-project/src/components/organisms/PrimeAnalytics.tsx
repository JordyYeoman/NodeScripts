import Card from "../molecules/Card";

const DummyYears = [2023, 2022, 2021];
const DummyMonths = [
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

function PrimeAnalytics() {
  return (
    <div className="flex w-full">
      <Card classes={"w-1/4 self-start flex flex-wrap"}>
        <div className="w-full h-6 text-sm font-bold uppercase">
          Prime Analytics
        </div>
        {DummyYears.map((year) => {
          return <Card classes={"ml-0 m-1"}>{year}</Card>;
        })}
        {DummyMonths.map((month) => {
          return <Card classes={"ml-0 m-1"}>{month}</Card>;
        })}
      </Card>
      <Card classes={"w-full ml-2 self-start font-dogica-bold"}>
        123.22 1241 2150935.0235
      </Card>
    </div>
  );
}

export default PrimeAnalytics;
