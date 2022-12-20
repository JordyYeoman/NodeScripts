import fs from "fs";

const filename = 'BeltThickness.csv';
let data: string[] = fs.readFileSync(filename, 'utf8').split('\n');

// Each line should be an array of values
let data2: string[][] = data.map(line => line.split(','))

// We only need the values at indexs < 11, others can be removed
let data3: string[][] = data2.map(line => line.slice(0, 11));

// Write output to CSV file
const writeStream = fs.createWriteStream(`PROCESSED - ${filename}`);
data3.forEach(line => writeStream.write(`${line.join(',')} \n`));

