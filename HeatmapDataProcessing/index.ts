import fs from "fs";

const filename = 'test.csv';
const topRow = ['sensor','reading','iteration'];
const sensorCount = 10;

let data: string[] = fs.readFileSync(filename, 'utf8').split('\n');

// Init writestream to CSV file
const writeStream = fs.createWriteStream(`PROCESSED_${filename}`);

// Add header line to new CSV file
writeStream.write(`${topRow}\n`);

// Each line should be an array of values
let data2: string[][] = data.map(line => line.split(','))

// We only need the values at indexs < 11, others can be removed
let data3: string[][] = data2.map(line => line.slice(1, 11));

// Remove header line since it is unnecessary
data3.splice(0, 1);
data3.splice(-1, 1)

// Loop data set and write each sensor & reading into a new line
data3.forEach((line: string[], iteration) => {
    // Extract sensor data and write to new line
    line.forEach((dataPoint: string, index: number) => {
        // console.log('dataPoint: ', dataPoint)
        writeStream.write(`${index + 1},${dataPoint},${iteration}\n`);
    });
});

writeStream.close(()=> {
    console.log('Gen data complete');
});