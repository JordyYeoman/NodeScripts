import BasicLineChart from "./BasicLineChart";

export const SmallWaveBox = ({ data, index }: { data: any; index: number }) => {
  return (
    <div
      className={`rounded w-1/3 h-[250px] bg-zinc-800 m-1 ml-0 xl:w-full xl:h-1/3 xl:ml-1 mb-0 mt-1 ${
        index === 0 ? "xl:mt-0" : ""
      } ${index === 2 ? "mr-0" : ""}`}
    >
      <BasicLineChart incomingData={{ data }} />
    </div>
  );
};
