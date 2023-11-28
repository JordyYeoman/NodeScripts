const get3DVectorLength = (a: number, b: number, c: number) =>
  Math.sqrt(a * a + b * b + c * c);

console.log('get3DVectorLength', get3DVectorLength(2, 2, 2));
console.log('get3DVectorLength', get3DVectorLength(3, 4, 12));
console.log('a', 4 + -4);

// To calc distance between 2 vectors, you should first get the length of each individual vector.
// EG -  (4, -5), (-4, 5)

// Vector 1 = SqrRoot( (4 - (-4))^2 + (-5 - 4))
