// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]

// Input: nums = [1], k = 1
// Output: [1]

function maxSlidingWindow(nums: number[], k: number): number[] {
  if (nums.length < k) return [Math.max(...nums)];

  const resultingArr: number[] = [];

  // 1. Create a loop to go through all nums in arr
  for (let i = 0; i <= nums.length - k; i++) {
    resultingArr.push(Math.max(...nums.slice(i, i + k)));
  }

  return resultingArr;
}

console.log(
  "sliding window: ",
  maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
);

console.log("sliding window 2: ", maxSlidingWindow([1, -1], 1));
