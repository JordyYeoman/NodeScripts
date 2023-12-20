const generateArray = (sizeOfArr: number) => {
  return Array.from(Array(sizeOfArr).keys());
};

// Generate 2 arrays to merge
const arr1 = generateArray(10);
const arr2 = generateArray(10);

arr1.reduce((acc, id) => {
  const priceKeys = generateArray(50);
  if (priceKeys.length) acc.push(...priceKeys);

  return acc;
}, []);
