// // Part One
// import { readFileSync } from 'fs';

// const file = readFileSync('day1.txt', 'utf-8');

// let total = 0;

// const getNumberFromString = (line: string) => {
//   // Find first number in the string
//   for (const char of line) {
//     const parsedNumber = parseInt(char);

//     if (!isNaN(parsedNumber)) {
//       return char;
//     }
//   }
// };

// file.split('\n').forEach((line) => {
//   let chars = '';

//   // Once we have broken the intial loop, we want to reverse the incoming string
//   // and once again find the first number.
//   chars += getNumberFromString(line);

//   // Find the second number, order from the back of string
//   const reversedLine = line.split('').reverse().join(' ');
//   chars += getNumberFromString(reversedLine);

//   // Join them, then add to total
//   total += parseInt(chars);
// });

// console.log('total: ', total);
// Part Two

import { readFileSync } from 'fs';

const file = readFileSync('day1.txt', 'utf-8');

let total = 0;

// Map of number words
const nums = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
]);

const getNumberFromString = (characters: any) => {
  let currentWord = '';
  // Find first number or word
  for (let char of characters) {
    currentWord += char;

    const parsedNumber = parseInt(char);
    // If number, return number
    if (!isNaN(parsedNumber)) {
      return char;
    }

    // Check if word atleast exists in map
    for (let [key, value] of nums) {
      if (
        currentWord.includes(key) ||
        currentWord.split('').reverse().join('').includes(key)
      ) {
        return value.toString();
      }
    }
  }

  return currentWord;
};

file.split('\n').forEach((line) => {
  const firstNumber = getNumberFromString(line);
  const reversedLine = line.split('').reverse().join('');
  const lastNumber = getNumberFromString(reversedLine);

  total += parseInt(firstNumber + lastNumber);
});

console.log('total: ', total);
