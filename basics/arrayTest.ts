const test = ["hello", "stark"];
const test2: any[] = [];

const t = "hello";
if (test.includes(t)) {
  console.log("test includes el: ", t);
}

if (![].length) {
  console.log("Domination");
}

console.log("El[0]", test2[0]?.test);
console.log('test2', test2[0]);
