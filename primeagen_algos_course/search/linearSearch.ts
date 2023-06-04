export const linearSearch = (
  haystack: number[],
  needle: number
): { found: boolean; index: number | undefined } => {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return {
        found: true,
        index: i,
      };
    }
  }

  return {
    found: false,
    index: undefined,
  };
};
