console.log("YEET CODE");

// Input: jewels = "aA", stones = "aAAbbbb"
// Output: 3
console.log(numJewelsInStones("aA", "aAAbbbb"));

function numJewelsInStones(jewels: string, stones: string): number {
  // 1. Create array from jewels
  const jewelsArr = jewels.split("");
  // 2. Create array from stones
  const stonesArr = stones.split("");

  // Loop over jewels and find how many stones === jewels.
  // Note - case sensitive
  return jewelsArr.reduce((acc, j) => {
    let totalForChar = 0;

    stonesArr.forEach((s) => {
      if (j === s) {
        totalForChar += 1;
      }
    });

    return totalForChar + acc;
  }, 0);
}
