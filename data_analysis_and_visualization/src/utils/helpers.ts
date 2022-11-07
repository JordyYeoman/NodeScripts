export interface ChartVal {
  p: number;
  i: number;
}

const getRangeCalibration = (
  input: any[],
  windowSize: number
): { rangeHigh: number; rangeLow: number } => {
  let rangeHigh = 0;
  let rangeLow = 0;
  input.map((val: number, index: number) => {
    if (index === 0) {
      rangeHigh = val;
      rangeLow = val;
    }
    if (val >= rangeHigh) {
      rangeHigh = val;
    }
    if (val <= rangeLow) {
      rangeLow = val;
    }
  });
  return { rangeHigh, rangeLow };
};

export const findQRSWave = (input: any[], analysisWindowSize: number) => {
  // TODO - find dataset range peaks
  let calibrationRange = getRangeCalibration(
    input,
    Math.floor(analysisWindowSize / 4)
  );
  // TODO - figure out how to add frequency Hz of data sampling
  let frequency = 100; // 100 samples a second?
  // With the data, identify all outstanding upper points, this will be our R of the QRS wave.
  let highestDataPoints: any[] = [];
  let minYRange: number = calibrationRange.rangeHigh * 0.7;
  // let smallWindowSize: number = 5;
  let smallWindowSize: number = 10;
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

  let localRSWavePoints = getRSWavePoints(highestDataPoints); // RS segments of 'QRS'
  let qWavePoints = getQWavePoints(input, localRSWavePoints); // Q segment of 'QRS'
  let pWavePoints = getPWavePoints(input, qWavePoints); // P segment of 'PQRSTT' wave
  let pWaveStartSegment = getPWaveStartSegment(input, pWavePoints); // P segment of 'PQRSTT' wave
  let tWavePoints = getTWavePoints(input, localRSWavePoints); // T segment of 'PQRSTT wave
  let tWaveEndSegment = getTWaveEndSegment(input, tWavePoints); // End of T Segment point

  return [
    {
      segment: 'RS',
      data: localRSWavePoints,
    },
    {
      segment: 'Q',
      data: qWavePoints,
    },
    {
      segment: 'P',
      data: pWavePoints,
    },
    {
      segment: 'PS',
      data: pWaveStartSegment,
    },
    {
      segment: 'T',
      data: tWavePoints,
    },
    {
      segment: 'TE',
      data: tWaveEndSegment,
    },
  ];
};

export interface IDataPoint {
  p: number;
  i: number;
}

const getPWaveStartSegment = (
  originalDataSet: any[],
  pWaveStartPoints: IDataPoint[]
): IDataPoint[] => {
  let pPoints: IDataPoint[] = [];
  let xStepsBackwardFromPPoint = 20; // Visually the best range forwards to find the P point.
  let currentLowestPPoint: IDataPoint = { i: 0, p: 0 };
  // Find local P wave points within 'N' range
  pWaveStartPoints.map((pPoint: IDataPoint) => {
    for (let z = 0; z < xStepsBackwardFromPPoint; z++) {
      let local = originalDataSet[pPoint.i - z];

      if (pPoint.i + z > originalDataSet.length - 1) break; // End for loop if trying to reach passed the data set size

      if (z === 0 || (local < pPoint.p && local <= currentLowestPPoint.p)) {
        currentLowestPPoint = {
          i: pPoint.i - z,
          p: local,
        };
      }
    }
    pPoints.push(currentLowestPPoint);
    currentLowestPPoint = { i: 0, p: 0 };
  });
  return pPoints;
};

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

const getRSWavePoints = (highestDataPoints: any[]) => {
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

export interface OverlayLabel {
  type: string;
  xValue: number;
  yValue: number;
  content: string;
  color: string;
  font: {
    size: number;
    weight: string;
  };
}

export interface HeartWaveSegment {
  segment: string;
  data: any[];
}

export const getBoxesAndLabelsForData = (
  heartWaveSegment: HeartWaveSegment
): any[] => {
  const { segment, data } = heartWaveSegment;
  let bufferLeftHorizontal = 3;
  let bufferRightHorizontal = 3;
  let boxes: OverlayBox[] = [];
  let labels: OverlayLabel[] = [];
  let colorVal: string = getColorForSegment(segment);

  data.forEach((value: any, index: number) => {
    boxes.push({
      type: 'box',
      xMin: value.i - bufferLeftHorizontal,
      xMax: value.i + bufferRightHorizontal,
      yMin: value.p - 10,
      yMax: value.p + 10,
      backgroundColor: colorVal,
      borderColor: colorVal,
    });
    labels.push({
      type: 'label',
      xValue: value.i,
      yValue: value.p + 24,
      content: segment,
      color: colorVal,
      font: {
        size: 8,
        weight: 'bold',
      },
    });
  });
  return [...boxes, ...labels] ?? [];
};

export const getColorForSegment = (segment: string) => {
  switch (segment) {
    case 'PS':
      return 'rgba(255,155,236, 0.5)';
    case 'P':
      return 'rgba(86, 243, 115, 0.5)';
    case 'Q':
      return 'rgba(103, 94, 232, 0.5)';
    case 'RS':
      return 'rgba(0, 175, 255, 0.5)';
    case 'T':
      return 'rgba(255, 66, 66, 0.5)';
    case 'TE':
      return 'rgba(235, 214, 40, 0.5)';
    default:
      return 'rgba(255,155,236, 0.5)';
  }
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
