function luckyNumber(n: number): boolean {
  // Get single ints from number
  const listOfNumbers: number[] = [];

  let remainingNumber = n;

  while (remainingNumber > 0) {
    // Get the base
    let endNumber = Math.floor(remainingNumber % 10);
    remainingNumber = Math.floor(remainingNumber / 10);
    // push list of numbers endNumber
    listOfNumbers.push(endNumber);
  }

  // Split into 2 halves
  const halfArrLength = listOfNumbers.length / 2;
  const firstHalf = listOfNumbers.slice(0, halfArrLength);
  const secondHalf = listOfNumbers.slice(halfArrLength);

  const x = firstHalf.reduce((acc, val) => val + acc, 0);
  const y = secondHalf.reduce((acc, val) => val + acc, 0);

  return x === y;
}

console.log("true", luckyNumber(1230));
console.log("false", luckyNumber(123));
console.log("false", luckyNumber(239017));
console.log("true", luckyNumber(134008));
console.log("false", luckyNumber(10));
console.log("true", luckyNumber(1010));
console.log("false", luckyNumber(100000));
console.log("true", luckyNumber(123321));
