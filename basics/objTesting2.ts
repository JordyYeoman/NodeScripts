const mTypes = {
  b: false,
  sp: true,
  sg: false
};
const mTypes2 = {
  b: false,
  sp: false,
  sg: true
};
const mTypes3 = {
  b: false,
  sp: false,
  sg: false
};

// Extract the first true value key
const getMTypeForValue = (types: typeof mTypes) => {
  for (const [key, value] of Object.entries(types)) {
    if(value) {
      return key?.toLowerCase();
    }
  }

  return 's'
}

console.log('mTypes', getMTypeForValue(mTypes));
console.log('mTypes2', getMTypeForValue(mTypes2));
console.log('mTypes3', getMTypeForValue(mTypes3));


const x = {} as any;
x['hello'] = 123;

const key = undefined as any;
console.log('x[key]', x[key]);
console.log('x[1]', x[1]);
console.log('x[null]', x[null as any]);
console.log('x[0]', x[0 as any]);