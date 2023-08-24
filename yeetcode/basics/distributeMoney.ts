// 1. Use all money provided
// 2. Everyone should receive atleast $1
// 3. Nobody gets $4

// Return the maximum number of children who may receive exactly 8 dollars
function distMoney(money: number, children: number): number {
  // If there is no way to distribute the money, return -1.
  if (money / children < 1) return -1;

  // Find max amount of children who can recieve atleast 8
  // Basic solution - give every child $1 (if possible) then loop back and give each child $7 until money runs out
  // a) Give every kid $1 - we know this, then we can subtract children from money
  let remainingMoney = money - children;

  // b) Loop through and give each child $7 until we can no longer do that, keeping tally of children with $8
  const tChildren = new Array(children)
    .fill(1)
    .map((child) => {
      if (remainingMoney > 7) {
        remainingMoney -= 7;
        return child + 7;
      }
    })
    .filter((x) => x > 1).length;

  return -1;
}

// Solution 2 - only want to do 1 pass through
function distMoney2(money: number, children: number): number {
  // If there is no way to distribute the money, return -1.
  if (money / children < 1) return -1;

  // Need to cover the 4 case

  const totalMoneyRemaining = money - children;
  const outcome = Math.floor(totalMoneyRemaining / 7);

  // We know total kids who can get $8, now we need to check if any remaining kids recieve $4
  const remainingKids = children - outcome;
  console.log("remaining kids: ", remainingKids);

  return outcome;
}

// console.log(distMoney(100, 101)); // -1
// console.log(distMoney(20, 3)); // 1
// console.log(distMoney(16, 2)); // 2
// console.log(distMoney(24, 3)); // 3

console.log(distMoney2(100, 101)); // -1
console.log(distMoney2(20, 3)); // 1
console.log(distMoney2(16, 2)); // 2
console.log(distMoney2(24, 3)); // 3

// If Money = 2 * totalWith8Bucks + 4;
