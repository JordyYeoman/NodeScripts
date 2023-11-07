function reverseParenthesis(inputString: string): string {
  const arr = Array.from(inputString);
  let pos1 = 0;
  let pos2 = 0;

  while (pos1 < arr.length) {
    if (arr[pos1] === "(") {
      pos2 = pos1 + 1;
      const stack: string[] = [];
      let openParentheses = 1; // To handle nested parentheses

      while (pos2 < arr.length && openParentheses > 0) {
        if (arr[pos2] === "(") {
          openParentheses++;
        } else if (arr[pos2] === ")") {
          openParentheses--;
        }

        stack.push(arr[pos2]);
        pos2++;
      }

      // Reverse the characters within parentheses
      const reversed = stack.reverse();

      // Replace the original substring with the reversed one
      arr.splice(pos1, pos2 - pos1, ...reversed);
    }

    pos1++;
  }

  return arr.filter((char) => char !== ")").join("");
}

console.log("rab", reverseParenthesis("(bar)"));
console.log("arabz", reverseParenthesis("a(bar)z"));
console.log("foorabbaz", reverseParenthesis("foo(bar)baz"));
console.log("foorabbazmilb", reverseParenthesis("foo(bar)baz(blim)"));

// TODO: Solve last test case.
