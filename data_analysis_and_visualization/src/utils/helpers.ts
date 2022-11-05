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

  // input.map((g) => {
  //   console.log(
  //     "highest val ",
  //     highestVal.p,
  //     "lowestval: ",
  //     lowestVal.p,
  //     "wtf g",
  //     g.p
  //   );
  //   if (g.p > highestVal.p) {
  //     highestVal = g;
  //   }
  //   if (g.p < lowestVal.p) {
  //     lowestVal = g;
  //   }
  // });

  return { highestVal, lowestVal };
};

// Return values greater than cutoff + highest of previous 30 values
// const getHighestValueOfPrevious = () => {
// We can see that a majority of the time, the 'R' portion of the wave is >2200mV
// 1. Find all points greater than 2200
// let cutOffVoltage = 2200;
//   if (dataPoint > cutOffVoltage) {
//     // Before adding to the dataset, check if this is a noisy signal
//     // Comparing previous X values & next X values should help seperate noise from the actual 'R' point in the 'QRS' wave
//     // 2. Check values X steps backwards from dataPoint
//     let xSteps = 60;
//     let xValid = false;
//     // Loop backwards
//     for (let i = 0; i <= xSteps; i++) {
//       if (input[index - i] < dataPoint - 10) {
//         xValid = true;
//       } else {
//         xValid = false;
//       }
//     }

//     // console.log("xValid", xValid);
//     if (xValid) {
//       highestDataPoints.push({
//         p: dataPoint,
//         i: index,
//       });
//     }
//   }
// }

// Interface for box
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
  let bufferLeftHorizontal = 10;
  let bufferRightHorizontal = 10;
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
