const testStr = "BIGORSE";

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log('testStr lowercase', testStr.toLowerCase());
console.log('testStr capitalise', capitalizeFirstLetter(testStr.toLowerCase()));

const pz: any[] = [];
console.log('pz: [0]', pz[0])