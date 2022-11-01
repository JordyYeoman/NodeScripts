import React, { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartFilter } from "../../types/enums";
import { calculateMovingAverage } from "../../utils/MovingWindowAverage";

const ChartSection = ({
  title,
  options,
  data,
  filterType,
}: {
  title: string;
  options: any;
  data: any;
  filterType: ChartFilter;
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [localDataSet, setLocalDataSet] = useState<any>([]);

  // Create useMemo to prevent recalculation of data
  useMemo(() => {}, [filterType]);

  const getLineChartForType = () => {
    switch (filterType) {
      case ChartFilter.Raw:
        return <Line options={options} data={data} />;
      case ChartFilter.MovingWindowAverage:
        let newData = data?.datasets?.map((p: any) => {
          if (p?.data) {
            return calculateMovingAverage(p?.data, 1);
          }
          return [];
        });
        // Data currently holds the current state of the chart info
        // Map the parsed data onto each of the new values in the data variable
        if (newData && newData.length > 0) {
          newData.map((dataChunk: string[], index: number) => {
            data.datasets[index].data = dataChunk;
          });
        }
        return <Line options={options} data={data} />;
      case ChartFilter.HighPassFilter:
        data = data;
        break;
      case ChartFilter.LowPassFilter:
        data.datasets[0].data = data;
        return <Line options={options} data={data} />;
      case ChartFilter.DiscreteFourierTransform:
        data = data;
        break;
      case ChartFilter.LowPassAndHighPassFilters:
        data = data;
        break;
      case ChartFilter.LowPassHighPassAndDiscreteFourierTransform:
        data = data;
        break;
      default:
        break;
    }
  };

  return <>{open ? <>{getLineChartForType()}</> : <></>}</>;
};

export default ChartSection;
