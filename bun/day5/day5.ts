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
// const lines = text.trim().split("\n");
const lines = text.trim().split("\n"); // test with first line
for (let line of lines) {
  if (line.trim() === "") {
    break;
  }

  // Index at 1, 5, 9, 13, 17, 21, 25, 29, 34
  let currCol = 0;
  // Split the line by column lengths
  const p = splitStringIntoChunks(line, 4);
  console.log("p", p);
  // Separate each column from the line
  Array.from(line).map((x, index) => {
    if (x === "") return;

    if (x === "[") {
      if (index + 1 === 1) {
        return twoDimensionalArray[0].push(line[index + 1]);
      }

      // Otherwise, lets get the divisible number (4 being distance apart from crates)
      twoDimensionalArray[currCol].push(line[index + 1]);
    }
  });

  //   console.log("twoDimensionalArray", twoDimensionalArray);
}
