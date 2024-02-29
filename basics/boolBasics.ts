const x = true;
const y = false;
const z = undefined;

console.log("[DEBUG] x && y", x && y); // false
console.log("[DEBUG] x && z", x && z); // undefined
console.log("[DEBUG] !(x && z)", !(x && z)); // true
console.log("[DEBUG] Boolean(x && z)", Boolean(x && z)); // false
console.log("[DEBUG] !Boolean(x && z)", !Boolean(x && z)); // true
console.log("[DEBUG] y && z", y && z); // false
console.log("[DEBUG] y && z", !!!(y && z)); // false
