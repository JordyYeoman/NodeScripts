import { readFileSync } from 'fs';

const file = readFileSync('day1.txt', 'utf-8');

let total = 0;

const getNumberFromString = (line: string) => {
  // Find first number in the string
  for (const char of line) {
    const parsedNumber = parseInt(char);

    if (!isNaN(parsedNumber)) {
      return char;
    }
  }
};

file.split('\n').forEach((line) => {
  let chars = '';

  // Once we have broken the intial loop, we want to reverse the incoming string
  // and once again find the first number.
  chars += getNumberFromString(line);

  // Find the second number, order from the back of string
  const reversedLine = line.split('').reverse().join(' ');
  chars += getNumberFromString(reversedLine);

  // Join them, then add to total
  total += parseInt(chars);
});

console.log('total: ', total);
