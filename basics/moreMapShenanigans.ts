const map = new Map();
const m2 = new Map([["ae134", "test"]]);

const x = map.get("nothing");
console.log("x", x);
console.log("m2 ae134", m2.get("ae134"));
