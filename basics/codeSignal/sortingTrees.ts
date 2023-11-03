// Tree is -1
//

function sortedTrees(a: number[]): number[] {
  const treePositions: number[] = [];

  a.forEach((element: number, index) => {
    if (element === -1) {
      // Remember the position of the tree
      treePositions.push(index);
    }
  });

  // Loop again to remove the trees from original array
  // So we can sort
  a.forEach((element, index) => (element === -1 ? a.splice(index, 1) : null));

  const sortedArray = a.sort();

  console.log("sortedArray", sortedArray);

  // Add the trees back in
  treePositions.forEach((tree: number) => {
    sortedArray.splice(tree, 0, -1);
  });

  return sortedArray;
}

// console.log("[1 ,2, -1, 3]", sortedTrees([1, 3, -1, 2]));
console.log(
  "A: [-1, 150, 190, 170, -1, -1, 160, 180]",
  sortedTrees([-1, 150, 190, 170, -1, -1, 160, 180])
);
// console.log("A: [-1, -1, -1, -1, -1]", sortedTrees([-1, -1, -1, -1, -1]));
// console.log("A:  [-1]", sortedTrees([-1]));
// console.log("A: [4, 2, 9, 11, 2, 16]", sortedTrees([2, 2, 4, 9, 11, 16]));
// console.log(
//   "A: [2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1]",
//   sortedTrees([1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2])
// );
// console.log(
//   "A: [23, 54, -1, 43, 1, -1, -1, 77, -1, -1, -1, 3]",
//   sortedTrees([1, 3, -1, 23, 43, -1, -1, 54, -1, -1, -1, 77])
// );
