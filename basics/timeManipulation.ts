const localTime = "1:00:00";
const localTime2 = "1:00:00 pm";

console.log(localTime.replace(/:00$/, ""));
console.log(localTime2.replace(/:00(\s|$)/, "$1"));
