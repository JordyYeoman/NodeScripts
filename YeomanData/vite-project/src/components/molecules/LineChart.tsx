import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { decompressFromUTF16 } from "async-lz-string";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { options } from "../../config/chartOptions";
import { useAppContext } from "../../AppWrapper";
import { generateLabels, getTxtFileDataAsArray } from "../../utils/dataUtils";
import { calculateMovingAverage } from "../../utils/MovingWindowAverage";
import { random_rgba } from "../../utils/misc";
import { ChartFilter } from "../../types/enums";
import ChartSection from "../atoms/ChartSection";
import { DataVisuals } from "./DataVisualsContainer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartDaddy = ({
  dataFilter,
  selectedData,
}: {
  dataFilter: ChartFilter;
  selectedData?: number[];
}) => {
  const { ironHeartData, setIronHeartData } = useAppContext();
  const [labels, setLabels] = useState<number[]>(generateLabels(1000));
  const [dataSets, setDataSets] = useState<any>([]);
  // Get the value and setter from the consumer hook

  useMemo;

  useEffect(() => {
    if (ironHeartData.length > 0) {
      const data = ironHeartData.filter((_data: any) =>
        selectedData?.includes(_data.chunkCount)
      );

      // Setup dataset in correct chart format:
      const getFormattedChartData = async () =>
        await Promise.all(
          data.map(async (oldData: any) => {
            return {
              label: "Test " + (Math.random() * 100).toFixed(2),
              data: (await decompressFromUTF16(oldData.data))
                .split(",")
                .slice(0, 5000), // TODO - Add ability to dynamically slice // Data formality atm to prevent browser churning RAM like mad.
              borderColor: random_rgba(),
              backgroundColor: "rgba(99, 255, 132, 0.5)",
            };
          })
        );
      getFormattedChartData()
        .then((formatted) => setDataSets(formatted))
        .catch(console.error);
    }
  }, [ironHeartData, selectedData, dataFilter]);

  const data = {
    labels,
    data: dataSets.length > 0 ? dataSets : [],
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex relative h-full w-full">
        {/* <ChartSection
          title={dataFilter.toString()}
          options={options}
          data={{
            datasets: dataSets.length > 0 ? dataSets : [],
            labels,
          }}
          filterType={dataFilter}
        /> */}
        <DataVisuals chartData={data} />
      </div>
    </div>
  );
};

export default ChartDaddy;
