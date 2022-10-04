// Thank you to: https://dirask.com/posts/JavaScript-moving-average-DZPeaj for the below code minus personal tweaks
// Warning: the above solution uses:
// -= and += operations on the sum variable that makes numerical mistakes when we work on floating numbers
// - it is good to modify below source code and recompute sum once per some amount of iterations (amount may be selectes empiricaly).

function caculateMovingAverage(data: number[], window: number) {
  var result: number[] = [];
  if (data.length < window) {
    return result;
  }
  var sum = 0;
  for (var i = 0; i < window; ++i) {
    sum += data[i];
  }
  result.push(sum / window);
  var steps = data.length - window - 1;
  for (var i = 0; i < steps; ++i) {
    sum -= data[i];
    sum += data[i + window];
    result.push(sum / window);
  }
  return result;
}

// Usage example:

var data = [1, 2, 3, 4, 5, 6];
var average = caculateMovingAverage(data, 3);

console.log(average); // [2, 3, 4]
