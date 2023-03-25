// Amazing article - https://medium.com/walkme-engineering/memory-in-javascript-beyond-leaks-8c1d697c655c

class Boom {
  id: number;
  x: number;
  y: number;

  constructor(id: number) {
    this.id = id;
    this.x = 0;
    this.y = 0;
  }
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const ROWS = 1000;
const COLS = 1000;
const repeats = 1000;
const arr = new Array(ROWS * COLS).fill(0).map((a, i) => new Boom(i));
const diffArr = new Array(ROWS * COLS).fill(0);
for (let col = 0; col < COLS; col++) {
  for (let row = 0; row < ROWS; row++) {
    diffArr[row * ROWS + col] = arr[col * COLS + row];
  }
}

// Traverse rows and columns
function localAccess() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      arr[i * ROWS + j].x = 0;
    }
  }
}

// Repeat function to quantify performance
// Means it will be stored in the cpu cache and be close for next iteration - preventing a cache miss
function repeat(cb: Function, type: string) {
  console.log(`Started data ${type}`);
  const start = performance.now();
  for (let i = 0; i < repeats; i++) {
    cb();
  }
  const end = performance.now();
  console.log(
    "Finished data locality test run in ",
    ((end - start) / 1000).toFixed(4),
    " seconds"
  );
  return end - start;
}

repeat(localAccess, "Local");

// If however, we do array access that is far between locations in memory, we will need to reach out to the BUS
// and request a new memory location where that far away location of data exists
function farAccess() {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      arr[j * ROWS + i].x = 0;
    }
  }
}

// Wait for localAccess to complete and resolve memory cache
// before starting with second test
setTimeout(() => {
  repeat(farAccess, "Non Local");
}, 2000);

// If I understand correctly, this method is now taking in the sorted array,
// So each index actually represents the correct order of objects in memory, preventing cache misses.
function farAccessWithArr(array: Array<Boom> | undefined) {
  if (!array) return;

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      array[j * ROWS + i].x = 0;
    }
  }
}

setTimeout(() => {
  repeat(() => farAccessWithArr(diffArr), "Non Local Sorted");
}, 2000);
