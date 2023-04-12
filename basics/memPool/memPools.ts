// Test Case 1: Pre Allocation of Arrays
function buildArray(n: number) {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
}

function buildArrayWithPreAllocation(n: number) {
  const arr = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
}

const buildArrayWithConstFnDec = (n: number) => {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
};

function buildArrayWithPreAllocationWithConstFnDec(n: number) {
  const arr = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    arr[i] = i;
  }
}

const runTestsAndGetAvg = (
  n: number,
  test: Function,
  sizeOfArray: number
): number => {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    const t0 = performance.now();
    test(sizeOfArray);
    const t1 = performance.now() - t0;
    arr.push(t1);
  }

  let timeToRun = 0;
  arr.forEach((x) => (timeToRun += x));
  return timeToRun / n;
};

const getPercentDiff = (o: number, z: number) => (o / z) * 100;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Systems online and ready sir!");

  // Find items in DOM
  let resContainer1 = document.getElementById("resOne");
  let resContainer2 = document.getElementById("resTwo");
  let resContainer3 = document.getElementById("resThree");
  let resContainer4 = document.getElementById("resFour");

  // Amount of time to run tests
  const tSize = 100000;
  const sizeOfArray = 10000;
  // Run Build Arr
  let basicRes = runTestsAndGetAvg(tSize, buildArray, sizeOfArray);
  let basicRes2 = runTestsAndGetAvg(
    tSize,
    buildArrayWithPreAllocation,
    sizeOfArray
  );
  let basicRes3 = runTestsAndGetAvg(
    tSize,
    buildArrayWithConstFnDec,
    sizeOfArray
  );
  let basicRes4 = runTestsAndGetAvg(
    tSize,
    buildArrayWithPreAllocationWithConstFnDec,
    sizeOfArray
  );

  if (resContainer1 && resContainer2 && resContainer3 && resContainer4) {
    resContainer1.textContent = `Standard FN noPreAlloc: ${basicRes}`;
    resContainer2.textContent = `Standard FN wPreAlloc: ${basicRes3} - improvement of ${getPercentDiff(
      basicRes - basicRes2,
      basicRes
    )}%`;
    resContainer3.textContent = `Const FN noPreAlloc: ${basicRes2}`;
    resContainer4.textContent = `Const FN wPreAlloc: ${basicRes4} - improvement of ${getPercentDiff(
      basicRes3 - basicRes4,
      basicRes3
    )}%`;
  }
});
