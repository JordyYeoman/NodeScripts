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


const x = [];
console.log('x?.length truthy?', x?.length ? 'true' : 'false'); // false
console.log('x?.length > 0 truthy?', (x?.length > 0) ? 'true' : 'false'); // false

const y = undefined as any;
console.log('y?.length truthy?', y?.length ? 'true' : 'false'); // false
console.log('y?.length > 0 truthy?', (y?.length > 0) ? 'true' : 'false'); // false

// const p = undefined as any;
// console.log('!!p', !!p);

const p = undefined as any;
let tuuu;
console.log('p as undefined: ', `Get your x ${p} as a value`);
console.log('tuuu: ', `Get your x ${tuuu} as a value`);
// Output: p as undefined:  Get your x undefined as a value