export interface ChartVal {
  p: number;
  i: number;
}

export const findQRSWave = (
  input: any[],
  analysisWindowSize: number
): any[] => {
  // With the data, identify all outstanding upper points, this will be our R of the QRS wave.
  let highestDataPoints: any[] = [];
  let minYRange: number = 600;
  let smallWindowSize: number = 5;
  // Find local QRS wave using largest range between data points method
  for (let i = 0; i < analysisWindowSize; i++) {
    let localArr: Array<number> = [];
    for (let j = 0; j < smallWindowSize; j++) {
      localArr.push(input[i + j]);
      localArr.push(input[i - j]);
    }
    let x = localArr.sort();
    let firstVar = x[0];
    let lastVar = x[x.length - 1];
    if (firstVar && lastVar) {
      let range = x[x.length - 1] - x[0];
      if (range > minYRange) {
        highestDataPoints.push({
          p: input[i],
          i,
        });
      }
    }
  }

  let localWavePoints = getLocalWavePoints(highestDataPoints); // RS segments of 'QRS'
  let qWavePoints = getQWavePoints(input, localWavePoints); // Q segment of 'QRS'
  let pWavePoints = getPWavePoints(input, qWavePoints); // P segment of 'PQRSTT' wave
  let tWavePoints = getTWavePoints(input, localWavePoints); // T segment of 'PQRSTT wave
  let tWaveEndSegment = getTWaveEndSegment(input, tWavePoints); // End of T Segment point

  return [
    ...localWavePoints,
    ...qWavePoints,
    ...pWavePoints,
    ...tWavePoints,
    ...tWaveEndSegment,
  ];
};

export interface IDataPoint {
  p: number;
  i: number;
}

const getTWaveEndSegment = (
  originalDataSet: any[],
  tWaveEndPoints: IDataPoint[]
): IDataPoint[] => {
  let tPoints: IDataPoint[] = [];
  let xStepsForwardFromTpoint = 20; // Visually the best range forwards to find the P point.
  let currentLowestTPoint: IDataPoint = { i: 0, p: 0 };
  // Find local P wave points within 'N' range
  tWaveEndPoints.map((tPoint: IDataPoint) => {
    for (let z = 0; z < xStepsForwardFromTpoint; z++) {
      let local = originalDataSet[tPoint.i + z];

      if (tPoint.i + z > originalDataSet.length - 1) break; // End for loop if trying to reach passed the data set size

      if (tPoint.i >= 476) {
        console.log("local", local, "index", tPoint.i + z, "loop: ", z);
      }
      if (z === 0 || (local < tPoint.p && local <= currentLowestTPoint.p)) {
        currentLowestTPoint = {
          i: tPoint.i + z,
          p: local,
        };
      }
    }
    tPoints.push(currentLowestTPoint);
    currentLowestTPoint = { i: 0, p: 0 };
  });
  return tPoints;
};

const getTWavePoints = (
  originalDataSet: any[],
  localWavePoints: IDataPoint[]
): IDataPoint[] => {
  let tPoints: IDataPoint[] = [];
  let xStepsForwardFromRpoint = 30; // Visually the best range backwards to find the P point.
  let currentHighestPPoint: IDataPoint = { i: 0, p: 0 };
  // Find local T wave points within 'N' range
  localWavePoints.map((wp: IDataPoint, index: number) => {
    if (index % 2 === 1) {
      for (let z = 0; z < xStepsForwardFromRpoint; z++) {
        let local = originalDataSet[wp.i + z];

        if (local > wp.p && currentHighestPPoint.p <= local) {
          currentHighestPPoint = {
            i: wp.i + z,
            p: local,
          };
        }
      }
      tPoints.push(currentHighestPPoint);
      currentHighestPPoint = { i: 0, p: 0 };
    }
  });
  return tPoints;
};

const getPWavePoints = (
  originalDataSet: any[],
  qWavePoints: IDataPoint[]
): IDataPoint[] => {
  let pPoints: IDataPoint[] = [];
  let xStepsBackwardFromQpoint = 30; // Visually the best range backwards to find the P point.
  let currentHighestPPoint: IDataPoint = { i: 0, p: 0 };
  // Find local P wave points within 'N' range
  qWavePoints.map((qPoint: IDataPoint) => {
    for (let z = 0; z < xStepsBackwardFromQpoint; z++) {
      let local = originalDataSet[qPoint.i - z];
      if (local > qPoint.p && currentHighestPPoint.p <= local) {
        currentHighestPPoint = {
          i: qPoint.i - z,
          p: local,
        };
      }
    }
    pPoints.push(currentHighestPPoint);
    currentHighestPPoint = { i: 0, p: 0 };
  });
  return pPoints;
};

const getQWavePoints = (originalDataSet: any[], localWavePoints: any[]) => {
  let xStepsBackwardFromHighpoint = 8; // Visually the best range backwards to find the Q point.
  let qWavePoints: any[] = [];
  localWavePoints.map((wp: any, index: number) => {
    // Highest point is every even number 0, 2, 4, 6 etc in the localWavePoints array.
    if (index === 0 || index % 2 === 0) {
      // Find the Q portion of the 'QRS' wave
      // Likely, the lowest point x steps backwards from the highest point
      let localQLowPoint = { p: 0, i: 0 };
      for (let x = 0; x <= xStepsBackwardFromHighpoint; x++) {
        let local = originalDataSet[wp.i - x];
        if (x === 0) {
          localQLowPoint = {
            p: local,
            i: wp.i - x,
          };
          continue;
        }
        if (local < localQLowPoint.p) {
          localQLowPoint = {
            p: local,
            i: wp.i - x,
          };
        }
      }
      qWavePoints.push(localQLowPoint);
    }
  });
  return qWavePoints;
};

const getLocalWavePoints = (highestDataPoints: any[]) => {
  // Find only the local largest Yrange in a specific range of X horizontal axis points
  // Implemented by finding the lowest and highest point in the range
  let localYRangeMax: number = 100;
  let localXRangeMax: number = 50;
  let localWavePoints: ChartVal[] = [];
  let currentHeartWave: any[] = [];
  highestDataPoints.map((p: ChartVal, _index: number) => {
    // Segregate Heart Beat Waves
    if (_index == 0 || currentHeartWave.length <= 0) {
      currentHeartWave.push(p);
      return;
    }
    // Check if final heart Wave for data set
    if (_index < highestDataPoints.length - 1) {
      // If still the current heart wave, push into the currentHeartWave[].
      let current = currentHeartWave[currentHeartWave.length - 1];
      let indexTotal = p.i - current.i;
      if (p.p > current.p || indexTotal < localXRangeMax) {
        currentHeartWave.push(p);
        return;
      }
    }
    // If its a new heart wave,
    // i. Find the highest and lowest values and add them to the list of boxes to display
    let rangeBoxes = getLargestRangeValues(currentHeartWave);
    localWavePoints.push(rangeBoxes.highestVal);
    localWavePoints.push(rangeBoxes.lowestVal);

    // ii. Then clear the currentHeartWave[] and repeat for remaining data points
    currentHeartWave = [];
    // Make sure not to miss the current index value during this current iteration
    currentHeartWave.push(p);
  });
  return localWavePoints;
};

const getLargestRangeValues = (
  input: any[]
): { highestVal: ChartVal; lowestVal: ChartVal } => {
  let highestVal = { p: 0, i: 0 };
  let lowestVal = { p: 0, i: 0 };
  let localVals = input.sort((a, b) => b.p - a.p);
  highestVal = localVals[0];
  lowestVal = localVals[localVals.length - 1];

  return { highestVal, lowestVal };
};
export interface OverlayBox {
  type: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  backgroundColor: string;
  borderColor: string;
}

export const getBoxesForData = (data: any[]): OverlayBox[] => {
  let bufferLeftHorizontal = 3;
  let bufferRightHorizontal = 3;
  let boxes: OverlayBox[] = [];

  data.forEach((value, index) => {
    boxes.push({
      type: "box",
      xMin: value.i - bufferLeftHorizontal,
      xMax: value.i + bufferRightHorizontal,
      yMin: value.p - 10,
      yMax: value.p + 10,
      backgroundColor: "rgba(255,155,236, 0.25)",
      borderColor: "rgba(255,149,244, 0.7)",
    });
  });

  return boxes ?? [];
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

export const generateRandomColor = (): string => {
  const randomBetween = (min: number, max: number) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  const a = randomBetween(0.25, 0.5);
  return `rgb(${r},${g},${b},${a})`;
};
