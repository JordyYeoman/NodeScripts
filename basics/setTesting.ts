const testArr = ["a", "b", "d", "e", "f", "f", "f"];
const testArr2 = ["a", "b", "c", "d", "d", "e"];
const newS = new Set(testArr);
const newS2 = new Set();
console.log(newS);
const res = testArr2.filter((x) => newS.has(x));
console.log(res);
const res2 = testArr2.filter((x) => !newS2.has(x));
console.log("res2", res2);
const res3 = testArr2.filter((x) => newS2.has(x));
console.log("res3", res3);
