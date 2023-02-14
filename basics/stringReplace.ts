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

let testStr4 = "Hello World! | Hello Muppet!";
console.log("Split Daddy: ", testStr4.split("|"));
console.log("Split Daddy2: ", testStr4.replace(/\s/g, "").split("|"));

let testStr5 = "Hey man whats upppp";
console.log("Spliterino: ", testStr5.split("|"));

let testStr6 =
  "Hello World! | Hello Muppet! Hello World! | Hello Muppet! Hello World! | Hello Muppet! Hello World! | Hello | Muppet! Hello World! || Hello Mup|pet!";
console.log("Splitting weird string: ", testStr6.replace(/\s/g, "").split("|"));

let testStr7 = "Woodbine Mohawk Park";
console.log(testStr7.replace(" ", "-"));

let testStr8 = "Woodbine Mohawk Park";
console.log(testStr8.replace(/ /g, "-"));

const testStr9 =
  "- The maximum Bonus Cash for this promotion is $50. - This offer is not claimable through Mates Mode pot bets. - Bets placed using Odds Boost are eligible for this offer.";
const updates: string = testStr9.replace(/\b\s-\s\b/g, "\n- ");
const updates2: string = testStr9.split(" - ").join("\n- ");
console.log("updates: ", updates);
console.log("updates2: ", updates2);

const testStr10 = "misc/hello-world";
if (testStr10.includes("hel")) {
  console.log("testStr10: INCLUDES pass");
}
console.log("testStr10: ", testStr10.replace("/", "-"));
