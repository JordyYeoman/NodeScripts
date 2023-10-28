function solution(matrix: number[][]): number {
  let totalCost = 0;

  // Loop through array starting at bottom of list and looking up one
  for (let i = matrix.length - 1; i >= 0; i--) {
    // walk through each row and check if above is a ghost, otherwise add to total cost
    for (let j = 0; j < matrix[i].length; j++) {
      const currRoomCost = matrix[i][j];

      // Handle top level
      if (i === 0) {
        if (currRoomCost > 0) {
          totalCost += currRoomCost;
          continue;
        }
      }

      // Check if ghost room OR any room above is also a ghost room
      if (currRoomCost > 0) {
        let canUpdate = true;
        // Check if any room above is a ghost room
        for (let k = i; k >= 0; k--) {
          if (!matrix[k][j]) {
            canUpdate = false;
          }
        }

        if (canUpdate) {
          totalCost += currRoomCost;
        }
      }
    }
  }

  return totalCost;
}

console.log(
  "Answer 9: ",
  solution([
    [0, 1, 1, 2],
    [0, 5, 0, 0],
    [2, 0, 3, 3],
  ])
);
console.log("Answer 1: ", solution([[1]]));
console.log(
  "Answer 15: ",
  solution([
    [4, 0, 1],
    [10, 7, 0],
    [0, 0, 0],
    [9, 1, 2],
  ])
);
console.log("Answer 15: ", solution([[1, 2, 3, 4, 5]]));
console.log(
  "Answer 5: ",
  solution([
    [1, 0, 3], // 5
    [0, 2, 1], // 1
    [1, 2, 0], // 0
  ])
);
console.log(
  "Answer 9: ",
  solution([
    [1, 1, 1, 0], // 9
    [0, 5, 0, 1], // 6
    [2, 1, 3, 10], // 1
  ])
);
