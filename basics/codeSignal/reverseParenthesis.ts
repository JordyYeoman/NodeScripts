function reverseParenthesis(inputString: string): string {
  const arr = Array.from(inputString);
  let pos1 = 0;

  while (pos1 < arr.length) {
    if (arr[pos1] === "(") {
      let pos2 = pos1 + 1;
      const stack: string[] = [];
      let openParentheses = 1;

      while (pos2 < arr.length && openParentheses > 0) {
        if (arr[pos2] === "(") {
          openParentheses++;
        } else if (arr[pos2] === ")") {
          openParentheses--;
        }

        stack.push(arr[pos2]);
        pos2++;
      }

      const reversed = stack.reverse();
      arr.splice(pos1, pos2 - pos1, ...reversed);
      pos1 = pos2 - reversed.length - 1; // Update pos1 to the correct position
    }

    pos1++;
  }

  return arr.filter((char) => char !== "(" && char !== ")").join("");
}

console.log("Answer: rab", reverseParenthesis("(bar)"));
console.log("Answer: arabz", reverseParenthesis("a(bar)z"));
console.log("Answer: foorabbaz", reverseParenthesis("foo(bar)baz"));
console.log("Answer: foobazrabblim", reverseParenthesis("foo(bar(baz))blim"));
console.log("Answer: foorabbazmilb", reverseParenthesis("foo(bar)baz(blim)"));
console.log("Answer: abcdefg", reverseParenthesis("(abc)d(efg)"));
