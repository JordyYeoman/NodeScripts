// Only include property in object if something evaluates to true

const poo = false;

// To conditionally add a property to an object, use the spread syntax
// ...(condition && { something: "toAdd" });
const x = {
  test: "hello",
  ...(poo === false && { yo2: "wassup2" }),
  ...(!poo && { yo: "wassup" }),
};

console.log("x", x);
