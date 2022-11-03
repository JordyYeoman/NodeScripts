export const findQRSWave = (input: any[]): number[] => {
  // Todo fix typing
  // With the data, identify all outstanding upper points, this will be our R of the QRS wave.
  let highestPoints: any[] = [];
  let currentHighestPoint: number = 0;
  let windowSize: number = 100;
  let count: number = 0;

  input.map((dataPoint: number) => {
    if (count >= windowSize) {
      highestPoints.push(currentHighestPoint);
      count = 0;
    }

    if (dataPoint > currentHighestPoint) {
      currentHighestPoint = dataPoint;
    }

    count++;
  });

  console.log("highestPoints:", highestPoints);
  return highestPoints;
};

export const generateLabels = (dataSetSize: number) => {
  let labels: number[] = [];
  if (!dataSetSize || isNaN(dataSetSize)) return [1, 2, 3];
  [...Array(Math.abs(dataSetSize)).keys()].map((i) => labels.push(i));
  return labels;
};

export const generateData = (dataSetSize: number) => {
  let data: number[] = [];
  if (!dataSetSize || isNaN(dataSetSize)) return [1, 2, 3];
  [...Array(Math.abs(dataSetSize)).keys()].map(() =>
    data.push(Math.floor(Math.random() * (2500 - 1000 + 1) + 1000))
  );
  return data;
};

export const generateRandomHeartbeat = (i: number): number => {
  return Math.floor((i * Math.random() * 100) / (Math.random() * 100 - i / 3));
};
