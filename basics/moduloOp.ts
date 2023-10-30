function solution(year: number) {
  if (year < 100) return 1;

  return Math.ceil(year / 100);
}

console.log("Year 80, century: ", solution(80));
console.log("Year 120, century: ", solution(120));
console.log("Year 250, century: ", solution(250));
console.log("Year 1100, century: ", solution(1100));
console.log("Year 1905, century: ", solution(1905));
console.log("Year 2001, century: ", solution(2001));
