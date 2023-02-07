const activePromos: Array<string | undefined> = ["hello", "world"];

// Check if type is array then run filter method?
let y = Array.isArray(activePromos) ? activePromos.filter((x: any) => x) : [];
let z: any[] = [];

if (Array.isArray(activePromos)) {
  z = activePromos.filter((x) => x);
}

console.log("z", z);
console.log("y", y);
