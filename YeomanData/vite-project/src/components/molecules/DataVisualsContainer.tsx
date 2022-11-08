import { useState } from "react";
import { DataLayer } from "../../types/interfaces";
import { SmallWaveBox } from "../atoms/SmallChart";
import { LineChartAnnotated } from "./LineChartAnnotated";

export const DataVisuals = ({ chartData }: { chartData: DataLayer }) => {
  const [waveData, setWaveData] = useState<any>({
    labels: undefined,
    data: undefined,
  });
  let { waveSegments } = waveData;
  const amountOfCharts = 3;
  let missingWaveSegments = false;

  if (waveSegments?.length < amountOfCharts) {
    missingWaveSegments = true;
  }

  // console.log("waveData: ", chartData);
  // console.log("waveSegments: ", waveSegments);

  return (
    <>
      <div className="overflow-hidden w-full flex flex-col xl:flex-row">
        <div className={`rounded w-full h-[750px] bg-zinc-800 xl:w-2/3`}>
          <LineChartAnnotated
            chartData={chartData}
            setWaveSegments={setWaveData}
          />
        </div>
        <div
          className={`flex flex-row w-full xl:flex-col transition duration-300 xl:w-1/3 xl:h-[750px]`}
        >
          {missingWaveSegments
            ? [...Array(Math.abs(amountOfCharts)).keys()].map(
                (_, index: number) => {
                  return (
                    <SmallWaveBox
                      key={index}
                      index={index}
                      data={waveSegments?.[index]?.data}
                    />
                  );
                }
              )
            : waveSegments &&
              waveSegments.map((data: any, index: number) => {
                if (index < 3) {
                  return <SmallWaveBox key={index} index={index} data={data} />;
                }
                return null;
              })}
        </div>
      </div>
    </>
  );
};
