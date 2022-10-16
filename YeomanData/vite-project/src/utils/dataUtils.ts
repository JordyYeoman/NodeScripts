import dataSet from "../assets/IRONHEART_BETA.txt";

export const generateLabels = (dataSetSize: number) => {
  let labels: number[] = [];
  if (!dataSetSize || isNaN(dataSetSize)) return [1, 2, 3];
  [...Array(Math.abs(dataSetSize)).keys()].map((i) => labels.push(i));
  return labels;
};

export const generateData = (dataSetSize?: number) => {
  let dummyData: any = [];
  let loopSize = dataSetSize ?? 500;
  for (let i = 0; i < loopSize; i++) {
    dummyData.push(
      Math.floor(Math.random() * 1000 + Math.random() * i).toString()
    );
  }
  return dummyData;
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const generateDataFilterString = (
  year: string,
  month: string,
  date: string
) => {
  // TODO - Add time filter here
  let time = "00:00";
  // UTC is Coordinated Universal Time, oooohhhhh :P
  // 1. Get date from day/month/year - 17 October 2022 00:00 UTC
  let dates = {
    dateRangeUpper: `${parseInt(date) + 1} ${capitalizeFirstLetter(
      month
    )} ${year} ${time} UTC`,
    dateRangeLower: `${date} ${capitalizeFirstLetter(
      month
    )} ${year} ${time} UTC`,
  };
  console.log("DATES: ", dates);
  return dates;
};

// Return text file data as array
export const getTxtFileDataAsArray = async (
  startDataPoint?: number,
  endDataPoint?: number,
  inputDataSrc?: string
) => {
  console.log("-------------------------------------");
  console.log("-------------------------------------");
  console.log("--------| Parsing DataSet |----------");
  console.log("-------------------------------------");
  console.log("-------------------------------------");
  let dataBoi = await fetch(dataSet);
  let textOfDataBoi = await dataBoi.text();
  let newDataSet: Array<any> = textOfDataBoi
    .trim()
    .split(",")
    .filter((x) => parseInt(x) !== 0);

  return newDataSet.splice(
    startDataPoint ?? 0,
    endDataPoint ?? newDataSet.length > 5000 ? 5000 : newDataSet.length
  );
};
