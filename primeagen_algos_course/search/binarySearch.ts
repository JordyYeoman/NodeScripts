// Search() that takes in an array
export const binarySearch = (
  haystack: number[],
  needle: number
): GenericSearchReturn => {
  let lo = 0;
  let hi = haystack.length;

  do {
    const m = Math.floor(lo + (hi - lo) / 2);
    const v = haystack[m];

    if (v === needle) {
      return { found: true, index: m };
    } else if (v > needle) {
      hi = m;
    } else if (v < needle) {
      lo = m + 1;
    }
  } while (lo < hi);

  return { found: false, index: undefined };
};
