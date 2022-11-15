let str = "Jordy|Is|a|Muppet";
let newStr = str.replace("|", "\n - ");
let newStr2 = str.replace(/\|/g, "\n - ");

console.log("newStr", newStr);
console.log("newStr2", newStr2);

const testStr = "h e l l o";
const demoStr = testStr.replace(" ", ""); // Does not work, returns original string
const demoStr2 = testStr.replace(/\s/g, "");
console.log("demoStr: ", demoStr);
console.log("demoStr2:", demoStr2);

let testStr2 = "  Hello World ! ";
const demoStr3 = testStr2.replace(/\s/g, "");
console.log("demoStr3:", demoStr3);
