import fs from "fs";
import readline from "readline";

// --- Day 3: Rucksack Reorganization ---

function readFile(file: any, callback: Function): Promise<number> {
  return new Promise(async (res, rej) => {
    try {
      let finalScore: number = 0;
      let rl = readline.createInterface({
        input: fs.createReadStream(file),
        terminal: false,
        crlfDelay: Infinity,
      });

      rl.on("line", function (line) {
        if (line.length < 1 || line === "") return;
        finalScore += callback(line);
      });

      rl.on("close", function () {
        res(finalScore);
      });
    } catch (err) {
      console.log(err);
      rej([]);
    }
  });
}

// Split into two halves
const getStringInTwoHalves = (str: string) => {
  const firstHalf = str.slice(0, str.length / 2);
  const secondHalf = str.slice(str.length / 2, str.length);
  return { firstHalf, secondHalf };
};

// generate priorities
// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
const generatePriorities = () => {
  const prioritiesMap = new Map();
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  for (let i = 1; i <= 52; i++) {
    if (i > 26) {
      let j = i - 26;
      prioritiesMap.set(alphabet[j - 1].toUpperCase(), i);
      continue;
    }
    prioritiesMap.set(alphabet[i - 1].toUpperCase(), i);
  }
  return prioritiesMap;
};

console.log("Map: ", generatePriorities());
