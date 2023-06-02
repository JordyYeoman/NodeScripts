import * as fs from 'fs';
import * as path from 'path';

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generate = () => {
  let x: any = [];
  for (let i = 0; i < 10000000; i++) {
    // x.push(randomIntFromInterval(0, 10000));
    x.push(i);
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

const readAndSort = () => {
  let data = fs.readFileSync(
    path.resolve(__dirname, './__tests__/testData.txt')
  );
  const d = [...data].sort();
  console.log('[...data]', [...data]);
  console.log('d', d);
  fs.writeFile(
    './__tests__/sortedTestData.txt',
    JSON.stringify(d),
    function (err: any) {
      if (err) {
        return console.error(err);
      }
      console.log('File created!');
    }
  );
};

generate();
