function sortedTrees(a: number[]): number[] {
  const treePositions: number[] = [];

  // Iterate over the input array to collect tree positions
  a.forEach((element: number, index) => {
    if (element === -1) {
      treePositions.push(index);
    }
  });

  // Filter out the -1 elements and sort the remaining elements
  const sortedArray = a
    .filter((element) => element !== -1)
    .sort((a, b) => a - b);

  // Reinsert the -1 'trees' at their original positions
  treePositions.forEach((tree: number) => {
    sortedArray.splice(tree, 0, -1);
  });

  return sortedArray;
}

console.log("[1 ,2, -1, 3]", sortedTrees([1, 3, -1, 2]));
console.log(
  "A: [-1, 150, 160, 170, -1, -1, 180, 190]",
  sortedTrees([-1, 150, 190, 170, -1, -1, 160, 180])
);
console.log("A: [-1, -1, -1, -1, -1]", sortedTrees([-1, -1, -1, -1, -1]));
console.log("A:  [-1]", sortedTrees([-1]));
console.log("A: [2, 2, 4, 9, 11, 16]", sortedTrees([4, 2, 9, 11, 2, 16]));
console.log(
  "A: [2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1]",
  sortedTrees([1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2])
);
console.log(
  "A: [1, 3, -1, 23, 43, -1, -1, 54, -1, -1, -1, 77]",
  sortedTrees([1, 3, -1, 23, 43, -1, -1, 54, -1, -1, -1, 77])
);
