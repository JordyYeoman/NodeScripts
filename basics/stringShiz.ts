const testStr = "BIGORSE";

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

console.log('testStr lowercase', testStr.toLowerCase());
console.log('testStr capitalise', capitalizeFirstLetter(testStr.toLowerCase()));