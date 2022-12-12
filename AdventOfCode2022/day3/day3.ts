import fs from "fs";
import readline from "readline";

// --- Day 3: Rucksack Reorganization 1h 54min ---

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
    prioritiesMap.set(alphabet[i - 1].toLowerCase(), i);
  }
  return prioritiesMap;
};

const priorityValuesMap = generatePriorities();

function getPriorityTotal(letters: string[]) {
  let total: number = 0;
  letters.map((letter) => {
    total += priorityValuesMap.get(letter);
  });
  return total;
}

function getDuplicateLettersFromLine(line: string) {
  let localDuplicates: string[] = [];

  let split = getStringInTwoHalves(line);
  Array.from(split.firstHalf).map((x) => {
    if (split.secondHalf.split("").includes(x)) {
      localDuplicates.push(x);
    }
  });

  return [...new Set(localDuplicates)];
}

function getDuplicateLettersFromArr(arr: string, arr2: string): string[] {
  let y: string[] = [];
  arr.split("").map((x) => {
    if (arr2.includes(x)) {
      y.push(x);
    }
  });

  return [...new Set(y)];
}

function getGroupBadge(arr: string[]): string {
  let localDuplicates: string[] = [];

  let duplicates: string[] = getDuplicateLettersFromArr(arr[0], arr[1]);

  duplicates.map((x) => {
    if (arr[2].split("").includes(x)) {
      localDuplicates.push(x);
    }
  });
  return [...new Set(localDuplicates)].toString();
}

function readFile(file: any): Promise<string[]> {
  return new Promise(async (res, rej) => {
    try {
      let localDuplicates: string[] = [];
      let rl = readline.createInterface({
        input: fs.createReadStream(file),
        terminal: false,
        crlfDelay: Infinity,
      });

      rl.on("line", function (line) {
        if (line.length < 1 || line === "") return;
        localDuplicates.push(...getDuplicateLettersFromLine(line));
      });

      rl.on("close", function () {
        res(localDuplicates);
      });
    } catch (err) {
      console.log(err);
      rej([]);
    }
  });
}

function readFile2(file: any): Promise<string[]> {
  return new Promise(async (res, rej) => {
    try {
      let currentLoop = 0;
      let currentGroup: string[] = [];
      let localDuplicates: string[] = [];
      let rl = readline.createInterface({
        input: fs.createReadStream(file),
        terminal: false,
        crlfDelay: Infinity,
      });

      rl.on("line", function (line) {
        if (line.length < 1 || line === "") return;
        if (currentLoop <= 2) {
          currentGroup.push(line);
        } else {
          currentGroup.push(line);
        }
        if (currentGroup.length === 3) {
          console.log("cUrrentgroup: ", currentGroup);
          // Find group badge
          let s: string = getGroupBadge(currentGroup);
          localDuplicates.push(...s);
          // reset loop and currentGroup
          currentLoop = 0;
          currentGroup = [];
        }
        currentLoop += 1;
      });

      rl.on("close", function () {
        res(localDuplicates);
      });
    } catch (err) {
      console.log(err);
      rej([]);
    }
  });
}

async function order66() {
  console.log("EXECUTE ORDER 66");
  // const duplicates = await readFile("input.txt");
  const badges = await readFile2("input.txt");
  // const sumOfNumbers = getPriorityTotal(duplicates);
  console.log("badges", badges.length);
  const sumOfBadges = getPriorityTotal(badges);
  // console.log(sumOfNumbers);
  console.log(sumOfBadges);
}

order66();
