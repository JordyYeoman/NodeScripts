// Thank you to: https://dirask.com/posts/JavaScript-moving-average-DZPeaj for the below code minus personal tweaks
// Warning: the above solution uses:
// -= and += operations on the sum variable that makes numerical mistakes when we work on floating numbers
// - it is good to modify below source code and recompute sum once per some amount of iterations (amount may be selectes empiricaly).

export function calculateMovingAverage(data: number[], window: number) {
  var result: any[] = [];
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
    result.push(Math.floor(sum / window));
  }
  return result;
}
