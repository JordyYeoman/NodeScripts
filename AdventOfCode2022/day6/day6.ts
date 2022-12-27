import fs from 'fs';

// --- Day 6: Tuning Trouble - 28 mins ---
let data: string = fs.readFileSync('input.txt', 'utf8');

// Loop through each characters and check if they are all unique.
// Find the first 4 characters that are unique

function hasUniqueCharacters(array: string[]) {
  const set = new Set(array);
  return set.size === array.length;
}

// Part One - 27mins - Part Two - 1 min
function main(input: string) {
  let arrOfChars = input.split('');
  let testingChars: string[] = [];
  let uniqueCodeAtIndex: number = 0;

  // Loop all characters
  arrOfChars.find((char: string, index: number) => {
    if (testingChars.length === 14) {
      console.log('Testing: ', testingChars);
      // Test for unique
      if (hasUniqueCharacters(testingChars)) {
        uniqueCodeAtIndex = index;
        return true;
      }
      // Remove first element
      testingChars.splice(0, 1);
    }
    testingChars.push(char);
  });

  // Show where first unique value lies
  console.log(uniqueCodeAtIndex);
}

// Run algo
main(data);
