// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]

// Input: nums = [1], k = 1
// Output: [1]

function maxSlidingWindow(nums: number[], k: number): number[] {
  if (nums.length < k) return [Math.max(...nums)];

  const resultingArr: number[] = [];

  // 1. Create a loop to go through all nums in arr
  for (let i = 0; i <= nums.length - k; i++) {
    // Check the max number in current window size.
    // EG pos 0, we want to check window size 3 - loop forward 3 and fix max
    resultingArr.push(Math.max(...nums.slice(i, i + k)));
  }

  return resultingArr;
}

console.log(
  "sliding window: ",
  maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
);

console.log("sliding window 2: ", maxSlidingWindow([1, -1], 1));

// TODO: Try take the average of the previous window size? could that work?
// Or - can we just step forward by the window size instead of 1?
// How about storing the values of the previous window?

// Hmmmm... using a set to remove any duplicates in the window then do a math.max?
// Maybe math.max is the slowest way to find the highest number in windpw, maybe instead we sort and then grab the last element.
