// Compare elements, make sure the square of elements in the 'a' array are equal to the elements in array 'b'
const compare = (a: any[], b: any[]) => {
  console.log("a", a, "b", b);
};

const main = (): number => {
  let a = [121, 144, 19, 161, 19, 144, 19, 11];
  let b = [
    11 * 11,
    121 * 121,
    144 * 144,
    19 * 19,
    161 * 161,
    19 * 19,
    144 * 144,
    19 * 19,
  ];

  console.log("Comparison resilt: ", compare(a, b));

  return 0;
};

main();
