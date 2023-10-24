function getInterestingPolygon(n: number) {
  return n * n + (n - 1) * (n - 1);
}

console.log("2", getInterestingPolygon(2)); // 5
console.log("3", getInterestingPolygon(3)); // 13
console.log("5", getInterestingPolygon(5)); // 41
console.log("9", getInterestingPolygon(9));
console.log("21", getInterestingPolygon(21));
