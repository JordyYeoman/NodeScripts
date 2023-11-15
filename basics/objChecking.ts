const s = null;
const y = { test: "hello" };
const x = ["test"];

console.log("");

const isObjectBra = (arg: any) => {
  return typeof arg === "object";
};

console.log("s", isObjectBra(s));
console.log("y", isObjectBra(y));
console.log("x", isObjectBra(x));
