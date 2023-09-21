const t = "";

if (t) {
  console.log("t exists!", t);
}

const numToTestWith = 123;
const undefToTestWith = undefined;

console.log('undefinedTest: ', undefToTestWith ?? '')
console.log('undef to String typeof: ', typeof String(undefToTestWith))
console.log('undef to String: ', String(undefToTestWith))
console.log('numToTestWith typeof: ', typeof String(numToTestWith))
console.log('numToTestWith: ', String(numToTestWith))
