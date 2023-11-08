//
const getArrayFromInput = (l: never) => {
  if (Array.isArray(l)) return;
  return (l as string).split(",");
};

console.log("[Test]", getArrayFromInput("test" as never));
console.log("[Test]", getArrayFromInput(["test"] as never));
