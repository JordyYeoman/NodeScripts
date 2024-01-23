const map = new Map();
const m2 = new Map([["ae134", "test"]]);
const m3 = new Map();

m3.set("User", "Jordy");
m3.set("User2", 123);

const x = map.get("nothing");
console.log("x", x);
console.log("m2 ae134", m2.get("ae134"));
console.log("m3 user", m3.get("User"));
console.log("m3 user1", m3.get("User2"));
