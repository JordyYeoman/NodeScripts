const testArr = [
  { hello: "world" },
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
console.log("s", (s as unknown as any[]).length);
if ((s as unknown as any[]).length) {
  console.log("full send");
}

// TLDR - Set removes duplicates of primitives but not, non-primitives.
