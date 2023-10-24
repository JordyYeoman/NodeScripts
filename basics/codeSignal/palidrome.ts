function isPalidrome(inputString: string): boolean {
  return inputString === Array.from(inputString).reverse().join("");
}

console.log("test", isPalidrome("test"));
console.log("sendIt", isPalidrome("sendIt"));
console.log("aaabbaaa", isPalidrome("aaabbaaa"));
