import fs from "fs";
import readline from "readline";

// --- Day 1: Calorie Counting: 59:30 ---

function readFile(file: any): Promise<number[]> {
  return new Promise((res, rej) => {
    try {
      const listOfElvesCalories: number[] = [];
      let currentElfCalories: number = 0;
      var rl = readline.createInterface({
        input: fs.createReadStream(file),
        terminal: false,
        crlfDelay: Infinity,
      });

      rl.on("line", function (line) {
        if (line.length < 1 || line === "") {
          listOfElvesCalories.push(currentElfCalories);
          currentElfCalories = 0;
          return;
        }
        let calories = parseInt(line);
        currentElfCalories += calories;
      }).on("close", function () {
        console.log("finsihed");
        res(listOfElvesCalories);
      });
    } catch (err) {
      console.log(err);
      rej([]);
    }
  });
}

const getGreedyElf = async () => {
  const listOfCalories: number[] = await readFile("input.txt");
  const sortedListOfCalories = listOfCalories.sort((a, b) => a - b);
  console.log("Greediest Elf: ", sortedListOfCalories.slice(-1));
  // Part 2 - find top 3 elves with most calories
  let greediestElves = sortedListOfCalories
    .slice(-3)
    .reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue
    );
  console.log("Greediest 3 Elves: ", greediestElves);
};

getGreedyElf();
