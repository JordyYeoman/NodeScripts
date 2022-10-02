import dataSet from "../assets/IRONHEART_BETA.txt";

// Return text file data as array
export const getTxtFileDataAsArray = (inputData?: never) => {
  const parsedData = fetch(dataSet)
    .then((r) => r.text())
    .then((text) => {
      return text.split(",");
    });

  return parsedData;
};
