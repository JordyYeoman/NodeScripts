// const fs = require("fs");

function getRandomNumber(
  lo: number,
  hi: number,
  multiplier: number = 1
): string {
  return ((Math.random() * (1 + hi - lo) + lo) * multiplier).toFixed(3);
}

function getListOfConsumption() {
  const arr: string[] = [];

  for (let i = 0; i < 365; i++) {
    arr.push(getRandomNumber(0, 0.789));
  }

  return arr;
}

const d = getListOfConsumption().join("\n");

fs.writeFile("power.csv", d, "utf8", function (err: unknown) {
  if (err) {
    console.log(
      "Some error occured - file either not saved or corrupted file saved."
    );
  } else {
    console.log("It's saved!");
  }
});
