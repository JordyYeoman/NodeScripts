import dataSet from "../assets/IRONHEART_BETA.txt";

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

// Return text file data as array
export const getTxtFileDataAsArray = async (startDataPoint?: number, endDataPoint?: number, inputDataSrc?: string) => {
  console.log("-------------------------------------");
  console.log("-------------------------------------");
  console.log("--------| Parsing DataSet |----------");
  console.log("-------------------------------------");
  console.log("-------------------------------------");
  let dataBoi = await fetch(dataSet);
  let textOfDataBoi = await dataBoi.text();
  let newDataSet: Array<any> = textOfDataBoi.trim().split(",").filter((x) => parseInt(x) !== 0);
  
  return newDataSet.splice(startDataPoint ?? 0, endDataPoint ?? newDataSet.length > 5000 ? 5000 : newDataSet.length);
};
