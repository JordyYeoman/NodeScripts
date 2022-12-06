import fs from "fs";
import readline from "readline";

// --- Day 2: Rock Paper Scissors 1h 30min ---
const handsMap = new Map([
  ["A", "rock"],
  ["X", "rock"],
  ["B", "paper"],
  ["Y", "paper"],
  ["C", "scissors"],
  ["Z", "scissors"],
]);

const scoresMap = new Map([
  ["rock", 1],
  ["paper", 2],
  ["scissors", 3],
  ["draw", 3],
  ["win", 6],
  ["loss", 0],
]);

let testOutcomes = [
  "A Y", // Win
  "B X", // Loss
  "C Z", // Draw
];

const getScore = (p1: string, p2: string) => {
  let score = 0;
  // Draw
  if (p1 === p2) {
    return 3;
  }
  // Win/Loss
  // rock beats scissors
  if (p1 === "rock") {
    if (p2 === "scissors") {
      score = 6;
    } else {
      score = 0;
    }
  }

  // paper beats rock
  if (p1 === "paper") {
    if (p2 === "rock") {
      score = 6;
    } else {
      score = 0;
    }
  }

  // scissors beats paper
  if (p1 === "scissors") {
    if (p2 === "paper") {
      score = 6;
    } else {
      score = 0;
    }
  }
  return score;
};

const getOutcome = (outcome: any) => {
  let outcomes = outcome.split(" ");

  // LOL - misread the question - ourhand is actually the second part of the input - STUPID!
  let p1Hand: string = handsMap.get(outcomes[1]) ?? "";
  let p2Hand: string = handsMap.get(outcomes[0]) ?? "";

  let handScore: number = scoresMap.get(p1Hand)!;
  let outcomeScore: number = getScore(p1Hand, p2Hand);

  // Sum total
  return outcomeScore + handScore;
};

// Stream in file
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

async function findOutcomeOfGames() {
  const finalScore = await readFile("input.txt", getOutcome);
  console.log("Final Score: ", finalScore);
}

// findOutcomeOfGames();

// Part 2

// In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y),
// so you also choose Rock. This gives you a score of 1 + 3 = 4.

const resultsMap = new Map([
  ["X", "loss"],
  ["Y", "draw"],
  ["Z", "win"],
]);

const getOurHand = (opponentHand: string, expectedOutcome: string) => {
  if (expectedOutcome === "draw") return opponentHand;
  if (opponentHand === "rock") {
    if (expectedOutcome === "loss") return "scissors";
    return "paper";
  }
  if (opponentHand === "paper") {
    if (expectedOutcome === "loss") return "rock";
    return "scissors";
  }
  if (opponentHand === "scissors") {
    if (expectedOutcome === "loss") return "paper";
    return "rock";
  }
};

const getOutcome2 = (outcome: any) => {
  let outcomes = outcome.split(" ");

  let p1Hand: string = handsMap.get(outcomes[0]) ?? "";
  let outcomeWanted: string = resultsMap.get(outcomes[1]) ?? "";
  let ourHand = getOurHand(p1Hand, outcomeWanted);

  let handScore: number = scoresMap.get(ourHand!)!;

  // Sum total
  return scoresMap.get(outcomeWanted)! + handScore;
};

async function getOutcomeOfGames() {
  const finalScore = await readFile("input.txt", getOutcome2);
  console.log("Final Score: ", finalScore);
}

getOutcomeOfGames();
