const x: number[] = [];
const testIterations = 50;

// Generate array to test with
for (let i = 0; i < 10000; i++) {
  x.push(i);
}

// Items to lookup for speed test
const itemsToFind = [
  20, 4000, 1251, 201, 9999, 5121, 9102, 1111, 1501, 2350, 2510, 1502, 1112,
  2515, 9202, 1950, 8504, 20, 4000, 1251, 201, 9999, 1024, 9888, 2841, 9721,
];

// Run the test n times and get the average
const runTest = (numTimes: number, testFunction: Function) => {
  const perfArr: number[] = [];

  Array.from(Array(numTimes)).map(() => {
    const startTest = performance.now();
    testFunction();
    const totalRuntime = performance.now() - startTest;
    perfArr.push(totalRuntime);
  });

  // Get average
  let avg = 0;
  perfArr.map((x) => (avg += x));
  return (avg / perfArr.length / 1000).toFixed(5);
};

const basicListItemLookup = () => {
  itemsToFind.map((item) => {
    x.map((x: number) => x === item);
  });
};

console.log(
  `Test average over ${testIterations} iterations: `,
  runTest(testIterations, basicListItemLookup)
);
