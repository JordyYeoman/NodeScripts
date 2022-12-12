import fs from "fs";
import readline from "readline";

// --- Day 4: Camp Cleanup 74 Minutes ---

const filename = 'input.txt';
let data: string[] = fs.readFileSync(filename, 'utf8').split('\n');
let answer: number = 0;
let answer2: number = 0;


data.map((pair: string)=> {
  let sections = pair.split(",")
  let leftStart = Number(sections[0].split("-")[0])
  let leftEnd = Number(sections[0].split("-")[1])
  let rightStart = Number(sections[1].split("-")[0])
  let rightEnd = Number(sections[1].split("-")[1])


  if ((leftStart >= rightStart && leftStart <= rightEnd) 
      || (leftEnd >= rightStart && leftEnd <= rightEnd) 
      || (rightStart <= leftEnd && rightStart >= leftStart) || (rightEnd <= leftEnd && rightEnd >= leftStart)) {
    answer2++
  }
})
console.log("Count: ", answer2)
