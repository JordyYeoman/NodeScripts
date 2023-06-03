import * as fs from 'fs';
import * as path from 'path';

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const generate = () => {
  let x: any = [];
  for (let i = 0; i < 1000000; i++) {
    if (i % 3 === 0) {
      const len = i % 2 === 0 ? 10 : 20;
      for (let k = 0; k < len; k++) {
        x.push(i);
      }
    } else {
      x.push(i);
    }
  }
  // Write to file
  createFile(x);
};

const createFile = (data: number[]) => {
  fs.writeFile('file.json', JSON.stringify(data), function (err: any) {
    if (err) {
      return console.error(err);
    }
    console.log('File created!');
  });
};

const readAndSort = () => {
  let data = fs.readFileSync(
    path.resolve(__dirname, './__tests__/testData.json')
  );
  const d = [...data].sort();
  console.log('[...data]', [...data]);
  console.log('d', d);
  fs.writeFile(
    './__tests__/sortedTestData.json',
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
