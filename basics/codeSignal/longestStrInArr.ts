function solution(inputArray: string[]): string[] {
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
  solution(["aba", "aa", "ad", "vcd", "aba"]),
  `Answer: ["aba", "vcd", "aba"]`
);

console.log(
  solution(["enyky", "benyky", "yely", "varennyky"]),
  `Answer: ["varennyky"]`
);

console.log(
  solution(["abc", "eeee", "abcd", "dcd"]),
  `Answer: ["eeee", "abcd"]`
);
