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

for (let line of lines) {
  if (line.trim() === "") {
    break;
  }

  // Split the line by column lengths
  const p = splitStringIntoChunks(line, 4);
  console.log("p", p);
  p.forEach((l, index) => {
    if (l?.length && l.includes("[") && l.includes("]")) {
      twoDimensionalArray[index].push(l[1]); // Take the center character
    }
  });

  console.log("twoDimensionalArray", twoDimensionalArray);
}
