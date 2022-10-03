import dataSet from "../assets/IRONHEART_BETA.txt";

export const generateData = (dataSetSize?: number) => {
  let dummyData: any = [];
  let loopSize = dataSetSize ?? 500;
  for (let i = 0; i < loopSize; i++) {
    dummyData.push((Math.floor(Math.random()) * 1000 + i).toString());
  }
  return dummyData;
};

// Return text file data as array
export const getTxtFileDataAsArray = async (inputData?: never) => {
  let dataBoi = await fetch(dataSet);
  let textOfDataBoi = await dataBoi.text();
  return generateData();
  // return textOfDataBoi.split(",");
};
