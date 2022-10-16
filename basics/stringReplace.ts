let str = "Jordy|Is|a|Muppet";
let newStr = str.replace("|", "\n - ");
let newStr2 = str.replace(/\|/g, "\n - ");

console.log("newStr", newStr);
console.log("newStr2", newStr2);
