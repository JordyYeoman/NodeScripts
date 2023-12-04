const testArr = [
  { hello: "world" },
  { hello: "world" },
  1,
  2,
  3,
  3,
  2,
  1,
  null,
  undefined,
  null,
  undefined,
  "helo",
  "helo",
];

const s = new Set(testArr);
console.log("s", s);

// TLDR - Set removes duplicates of primitives but not, non-primitives.
