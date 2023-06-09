// Objects
const t = new Map([
  ["person1", {}],
  ["person2", {}],
  ["person3", {}],
  ["person4", {}],
]);

// Nested maps
const k = new Map([
  ["person1", new Map()],
  ["person2", new Map()],
  ["person3", new Map()],
  ["person4", new Map()],
]);

const testSize = 10;
const testArr2: object[] = [];
// Setup reduce size
for (let i = 0; i < testSize; i++) {
  testArr2.push({
    hey: "yo",
    index: i,
  });
}

const testSpread = (): number => {
  const perNow = performance.now();
  const z = testArr2.reduce((acc: any, b: any) => {
    acc.set("person1", {
      ...acc.get("person1"),
      [b.index]: {
        more: "test",
        id: b.index,
      },
    });

    acc.set("person2", {
      ...acc.get("person2"),
      [b.index]: {
        more: "wow",
        id: b.index,
      },
    });

    acc.set("person3", {
      ...acc.get("person3"),
      [b.index]: {
        more: "hey",
        id: b.index,
      },
    });

    acc.set("person4", {
      ...acc.get("person4"),
      [b.index]: {
        more: "yah",
        id: b.index,
      },
    });

    return acc;
  }, t);
  console.log("Test Spread", z);
  return (performance.now() - perNow) / 1000;
};

const testMaps = (): number => {
  const perNow = performance.now();
  let t = testArr2.reduce((acc: any, b: any) => {
    acc.set("person1", {
      ...acc.get("person1"),
      [b.index]: {
        more: "test",
        id: b.index,
      },
    });

    acc.set("person2", {
      ...acc.get("person2"),
      [b.index]: {
        more: "wow",
        id: b.index,
      },
    });

    acc.set("person3", {
      ...acc.get("person3"),
      [b.index]: {
        more: "hey",
        id: b.index,
      },
    });

    acc.set("person4", {
      ...acc.get("person4"),
      [b.index]: {
        more: "yah",
        id: b.index,
      },
    });

    return acc;
  }, k);
  console.log("TEST MAP: ", t);
  console.log("TEST MAP: ", t.get('person1')[0]);
//   console.log("TEST MAP: ", typeof t.get('person1').get('1'));
  return (performance.now() - perNow) / 1000;
};

console.log("Spread time", testSpread().toFixed(4), "s");
console.log("Map time", testMaps().toFixed(4), "s");
