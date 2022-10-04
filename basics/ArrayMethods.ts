const testArray = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const filterArrBasedOnNum = (
  lessThanOrEqualTo: number,
  arr: number[]
): number[] => arr.filter((val) => val <= lessThanOrEqualTo);

console.log("result: ", filterArrBasedOnNum(15, testArray));
