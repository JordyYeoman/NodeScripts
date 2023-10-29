// Given 2 strings, find the common characters between them
function solution(s1: string, s2: string): number {
  let commonChars = 0;

  // Copy of string that will be modified after each character match
  let s2Copy = Array.from(s2); // Pass by value since primitive type

  // Loop through first string characters
  Array.from(s1).forEach((s1Char: string) => {
    // Loop through second string and find the element
    for (let i = 0; i < s2Copy.length; i++) {
      // If we do find it, increment the common chars
      if (s1Char === s2Copy[i]) {
        commonChars += 1;
        // and remove the element from the string
        s2Copy.splice(i, 1);
        // exit the for loop
        break;
      }
    }
  });

  return commonChars;
}

console.log("3: ", solution("aabcc", "adcaa"));
console.log("4: ", solution("zzzz", "zzzzzzz"));
console.log("3: ", solution("abca", "xyzbac"));
