// https://adventofcode.com/2022/day/5
const path = "./input.txt";
const file = Bun.file(path);

const text = await file.text();

function splitStringIntoChunks(inputString: string, chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < inputString.length; i += chunkSize) {
    chunks.push(inputString.slice(i, i + chunkSize).trim());
  }
  return chunks;
}

// Part 1
// Create the 2D array with input
const twoDimensionalArray: any[][] = Array.from(Array(9), () => []);
const lines = text.trim().split("\n");
const currentStack = lines.slice(0, 8);
const commands = lines.slice(10);

for (let line of currentStack) {
  if (line.trim() === "") {
    break;
  }

  // Split the line by column lengths
  const p = splitStringIntoChunks(line, 4);

  p.forEach((l, index) => {
    if (l?.length && l.includes("[") && l.includes("]")) {
      twoDimensionalArray[index].push(l[1]); // Take the center character
    }
  });
}

console.log("before ordering: twoDimensionalArray", twoDimensionalArray);
// Because of the order added to the array, we need to reverse all of the columns
twoDimensionalArray.forEach((column) => column.reverse());
console.log("after ordering: twoDimensionalArray", twoDimensionalArray);

// Take messages and convert to commands
for (let command of commands) {
  const firstHalf = command.split("f");
  const moveTotalCrates = Number(firstHalf[0].match(/\d+/g)?.[0]);
  const fromColumn = Number(firstHalf[1].split("t")[0].match(/\d+/g)?.[0]) - 1; // Account for array indexing
  const toColumn = Number(firstHalf[1].split("t")[1].match(/\d+/g)?.[0]) - 1;

  for (let i = 0; i < moveTotalCrates; i++) {
    // console.log("fromColumn: ", fromColumn);
    // console.log("toColumn: ", toColumn);
    let elRemoved = twoDimensionalArray[fromColumn].pop();
    twoDimensionalArray[toColumn].push(elRemoved);
  }
}

console.log("twoDimensionalArray", twoDimensionalArray);
const topCratesAtEnd = twoDimensionalArray.map((col) => col.pop());
console.log("topCratesAtEnd", topCratesAtEnd.join(""));
