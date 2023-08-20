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

// ChatGPT solution Deque:
function maxSlidingWindow2(nums: number[], k: number): number[] {
  const result: number[] = [];
  const deque: number[] = []; // Store indices of elements

  for (let i = 0; i < nums.length; i++) {
    // Remove elements that are out of the current window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Remove elements that are smaller than the current element
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Add maximum to the result when the window size is reached
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// My assumption here is - a deque is great if you only need to loop through the array once, you can do a combination of computes without doing additional traversal.
function maxSlidingWindow3(nums: number[], k: number): number[] {
  // 1. create a deque
  return [];
}
