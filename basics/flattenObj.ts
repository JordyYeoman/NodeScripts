const h = [
  [{ testing: "master" }],
  [{ testing: "master" }],
  [{ testing: "master" }],
];

// Essentially bring all the nested array items up one level into the parent array.
const z = h.flatMap((styles) => styles);
const k = h.reduce(
  (accumulator, currentValue) => ({ ...accumulator, ...currentValue }),
  {}
);
console.log("k", k);
console.log("z", z);
