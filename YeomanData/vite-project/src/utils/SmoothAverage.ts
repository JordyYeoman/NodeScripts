export const getSmoothedData = (
  data: number[],
  windowSize: number
): number[] => {
  const smoothDataSet: number[] = [];

  let localNums = [];
  let count = 0;
  for (let x = 0; x < data?.length; x++) {
    if (count < windowSize) {
      localNums.push(data[x]);
      count++;
    }
    if (count >= windowSize) {
      count = 0;
      smoothDataSet.push(getAverage(localNums));
      localNums = [];
    }
  }
  return smoothDataSet ?? [];
};

const getAverage = (nums: number[]): number => {
  let sum = 0;
  nums.forEach((n) => (sum += n));
  return Math.floor(sum / nums.length);
};
