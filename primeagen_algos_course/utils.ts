import * as fs from 'fs';

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generate = () => {
  let x: any = [];
  for (let i = 0; i < 10000000; i++) {
    x.push(randomIntFromInterval(0, 10000));
  }
  // Write to file
  createFile(x);
};

const createFile = (data: number[]) => {
  fs.writeFile('file.txt', JSON.stringify(data), function (err: any) {
    if (err) {
      return console.error(err);
    }
    console.log('File created!');
  });
};

generate();
