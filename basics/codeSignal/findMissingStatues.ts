function findMissingStatues(inputArr: number[]): number {
  // Take the input array, find any consecutive values with values > 1 in difference
  const missingNums: number[] = [];
  inputArr.sort();

  console.log("input arr: ", inputArr);

  for (let i = 0; i < inputArr.length - 1; i++) {
    const p1 = inputArr[i];
    const p2 = inputArr[i + 1];
    const res = p2 - p1;

    if (res > 1) {
      // Find out by how much
      for (let j = 1; j < res; j++) {
        missingNums.push(inputArr[i] + j);
      }
    }
  }

  return missingNums.length;
}

function findMissingStats2(inputArr: number[]): number {
  // find min value
  const minVal = Math.min.apply(null, inputArr);
  // find max value
  const maxVal = Math.max.apply(null, inputArr);
  // get distance between those values
  const d = maxVal - minVal;
  // subtract count of elements already in array
  const missingNumsCount = d - inputArr.length;
  // Add 1 so the input arr is inclusive
  return missingNumsCount + 1;
}

console.log("[6, 2, 3, 8]", findMissingStatues([6, 2, 3, 8])); // 4, 5, 7 // 3
console.log("[0, 3]", findMissingStatues([0, 3])); // 2
console.log("[6, 3]", findMissingStatues([6, 3])); // 2
console.log("[5, 4, 6]", findMissingStatues([5, 4, 6])); // 0

console.log("[6, 2, 3, 8]", findMissingStats2([6, 2, 3, 8])); // 4, 5, 7 // 3
console.log("[0, 3]", findMissingStats2([0, 3])); // 2
console.log("[6, 3]", findMissingStats2([6, 3])); // 2
console.log("[5, 4, 6]", findMissingStats2([5, 4, 6])); // 0

console.log("[1, 2, 3]", Math.min.apply(null, [1, 2, 3]));
console.log("[1, 2, 3]", Math.max.apply(null, [1, 2, 3]));
