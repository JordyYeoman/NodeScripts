const t = {
  poo: " wergrew ",
  wee: 222,
  iii: Date.now(),
  dia: ["qerg", "34t243t ", " 23rg", "qerg"],
  test1: ["qerg", "34tf243t ", " 23rg", "11111"],
  test2: ["qerg", "34t243t ", " 23rg", "1111"],
  test3: " wergrew ",
  test4: "ew ",
  test5: "124124",
  test6: ["qerg ", "   34t243t ", "  23rg", ["qerg", "34t243t ", " 23rg", "1111"], {
    more: 'testing',
    reeaaaaalll: 'hardcore'
  }],
};

export const trimStrings = (payload: any) => {
  for (let key in payload) {
    if (typeof payload[key] === "string") {
      payload[key] = payload[key].trim();
    }
    if (Array.isArray(payload[key])) {
      payload[key].map((l: any, i: number) => {
        payload[key][i] = typeof l === 'string' ? l.trim() : trimStrings(l);
      });
    }
  }
};

trimStrings(t);

console.log(t);
