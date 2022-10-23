// A low-pass filter is one which does not affect low frequencies and rejects high frequencies.
//      y(n) = x(n) + x(n-1)
const simplp = (
  x: number[] | number,
  y: number[] | number,
  M: number,
  xm1: number
): number => {
  let n: number = 0;
  y[0] = x[0] + xm1;
  for (n = 1; n < M; n++) {
    y[n] = x[n] + x[n - 1];
  }
  return x[M - 1];
};

const SimpleLowPass = () => {
  let x: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let y: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let i: number;
  let N: number = 10;
  let M: number = N / 2; // Block Size
  let xm1: number = 0;

  xm1 = simplp(x, y, M, xm1);
  //   xm1 = simplp(x[M], y[M], M, xm1); // Re-assign xm1 with new value?

  for (i = 0; i < N; i++) {
    // printf('x[%d]=%f\ty[%d]=%f\n', i, x[i], i, y[i]);
    console.log('xm1: ', xm1);
  }

  return 0;
};

console.log(SimpleLowPass());
