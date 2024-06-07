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


const x = [1];
console.log('x?.length: ', x?.length);
console.log('x?.length > 0', x?.length > 0);
console.log('x?.length truthy?', x?.length ? 'true' : 'false');
console.log('x?.length > 0 truthy', (x?.length > 0) ? 'true' : 'false');
