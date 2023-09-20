const IS_DEV = true;
const id = "AIUB8124BAF";
const screenName = "HomeScreen";

!IS_DEV || console.log(id, "refocussed", screenName);

// Verify ternary logic
let xT = false;
let yF = "Running secondary logic";

console.log("test: ", xT ?? yF);
