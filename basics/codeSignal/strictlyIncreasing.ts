// def almostIncreasingSequence(sequence):
//     removed = 0
//     previous_maximum = maximum = float('-infinity')
//     for s in sequence:
//         if s > maximum:
//             # All good
//             previous_maximum = maximum
//             maximum = s
//         elif s > previous_maximum:
//             # Violation - remove current maximum outlier
//             removed += 1
//             maximum = s
//         else:
//             # Violation - remove current item outlier
//             removed += 1
//         if removed > 1:
//             return False
//     return True

function strictlyIncreasing(sequence: number[]): boolean {
  let removed = 0;
  let previousMaximum = Number.NEGATIVE_INFINITY;
  let maximum = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] > maximum) {
      previousMaximum = maximum;
      maximum = sequence[i];
    } else if (sequence[i] > previousMaximum) {
      removed += 1;
      maximum = sequence[i];
    } else {
      removed += 1;
    }
  }

  if (removed > 1) return false;

  return true;
}

const testCases = [
  [3, 5, 67, 98, 3], // true
  [123, -17, -5, 1, 2, 3, 12, 43, 45], // true
  [1, 2, 3, 4, 99, 5, 6], // true
  [1, 2, 1, 2], // false
  [1, 2, 3, 4, 3, 6], // true
  [3, 5, 67, 98, 3], // true
];

testCases.forEach((testCase) => {
  console.log(strictlyIncreasing(testCase));
});
