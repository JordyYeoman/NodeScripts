// Check if strictly increasing
function isIncreasing(sequence: number[]): number {
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] >= sequence[i + 1]) {
      // Check the following 2 elements ensure the middle number is not the one to remove
      if (sequence[i] < sequence[i + 2]) {
        return i + 1;
      }

      return i;
    }
  }

  return -1;
}

function strictlyIncreasing(sequence: number[]): boolean {
  // Check if numbers are in increasing order
  const indexToRemove = isIncreasing(sequence);

  // Splice returns a new array with removed elements but also modifies the original array
  sequence.splice(indexToRemove, 1);
  const resAfterRemove = isIncreasing(sequence);
  if (resAfterRemove === -1) return true;

  return false;
}

const testCases = [
  [3, 5, 67, 98, 3], // false
  [123, -17, -5, 1, 2, 3, 12, 43, 45], // true
  [1, 2, 3, 4, 99, 5, 6], // true
  [1, 2, 1, 2], // false
  [1, 2, 3, 4, 3, 6], // true
  [3, 5, 67, 98, 3], // true
];

testCases.forEach((testCase) => {
  console.log(strictlyIncreasing(testCase));
});
