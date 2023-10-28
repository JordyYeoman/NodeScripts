function longestStr(inputArray: string[]): string[] {
  // find longest arr
  let longestStrInArr = 0;
  const arrOfLongStrings: string[] = [];

  inputArray.forEach((str: string) => {
    if (str.length > longestStrInArr) {
      longestStrInArr = str.length;
    }
  });

  inputArray.forEach((str: string) => {
    if (str.length === longestStrInArr) {
      arrOfLongStrings.push(str);
    }
  });

  return arrOfLongStrings;
}

console.log(
  longestStr(["aba", "aa", "ad", "vcd", "aba"]),
  `Answer: ["aba", "vcd", "aba"]`
);

console.log(
  longestStr(["enyky", "benyky", "yely", "varennyky"]),
  `Answer: ["varennyky"]`
);

console.log(
  longestStr(["abc", "eeee", "abcd", "dcd"]),
  `Answer: ["eeee", "abcd"]`
);
