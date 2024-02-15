type Start = {
  seconds: number;
  nanoseconds?: number;
};

const method = "";
console.log("Method is: ", method ?? "test-method"); // Evaluates to empty string
console.log("Method is: ", method ? method : "test-method"); // Evaluates to `test-method` :O
