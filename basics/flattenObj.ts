const h = [{ hello: "world" }, { sup: "homie" }];

const z = h.flatMap((styles) => styles);
const k = h.reduce(
  (accumulator, currentValue) => ({ ...accumulator, ...currentValue }),
  {}
);
console.log("k", k);
