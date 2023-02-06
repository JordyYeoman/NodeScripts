// Basic example
const test = [
  { name: "jordy", age: 12, group: "C" },
  { name: "tim", age: 2, group: "QA" },
  { name: "bob", age: 5, group: "DL" },
];

let x = test.filter((person) => person.group === "C");
console.log("x", x);

let y = test.filter((person) => person.age < 10);
console.log("y", y);

// Nested Array example
const test2 = [
  { name: "jordy", age: 12, group: ["C"] },
  { name: "tim", age: 2, group: ["QA"] },
  { name: "bob", age: 5, group: ["DL", "MG"] },
  { name: "bob", age: 5 }, // Object missing group - How does filter handle it? 
];

let z = test2.filter((person) => person?.group?.includes("C"));
console.log("z", z);

let k = test2.filter((person) => person?.group?.includes("DL"));
console.log("k", k);
