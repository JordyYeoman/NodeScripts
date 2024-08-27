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
