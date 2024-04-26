const testStr = "BIGORSE";

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log('testStr lowercase', testStr.toLowerCase());
console.log('testStr capitalise', capitalizeFirstLetter(testStr.toLowerCase()));

const pz: any[] = [];
console.log('pz: [0]', pz[0])


const x = {};
const k = undefined as any;
const y = {1: 'hello'};

const z = {
    ...x,
    ...k,
    ...y,
}
const i = { ...z, ...z, ...{ ...z}}
const j = { ...i, ...z }

console.log('z', z);
console.log('i', i); // Same memory address of the obj
console.log('j', j); // Still all same memory address of the object