function largestProduct(inputArray: number[]): number {
  let highestProduct: number | undefined;
  for (let i = 0; i < inputArray.length - 1; i++) {
    const p1 = inputArray[i];
    const p2 = inputArray[i + 1];
    const total = p1 * p2;

    if (!highestProduct || total > highestProduct) {
      highestProduct = total;
    }
  }

  return highestProduct ?? 0;
}

console.log("[3, 6, -2, -5, 7, 3]", largestProduct([3, 6, -2, -5, 7, 3]));
console.log("[5, 1, 2, 3, 1, 4]", largestProduct([5, 1, 2, 3, 1, 4]));
console.log("[-23, 4, -3, 8, -12]", largestProduct([-23, 4, -3, 8, -12]));
console.log(
  "[9, 5, 10, 2, 24, -1, -48]",
  largestProduct([9, 5, 10, 2, 24, -1, -48])
);
