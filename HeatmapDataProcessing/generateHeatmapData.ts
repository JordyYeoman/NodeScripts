import fs from "fs";

const filename = 'Data.csv';
const topRow = ['sensor','reading','iteration'];
const sensorCount = 10;
const totalDataReadings = 250000;

// Open a write stream
const writeStream = fs.createWriteStream(`GENERATED-${filename}`);


// Random number generator
function randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

// Structure per loop to follow: 
// ['sensor1', 'reading', 'iteration']
// ['sensor2', 'reading', 'iteration']
// ['sensor1', 'reading', 'iteration']
// ['sensor2', 'reading', 'iteration']

function main(): void {
    // Add heading column to file
    writeStream.write(`${topRow}\n`);

    // Loop for `totaDataReadings` to generate appropriate data size
    for(let i = 0; i < totalDataReadings; i++) {  
        // New line per sensor
        for(let j = 0; j < sensorCount; j++) {
            let s = [j + 1, randomNumber(18, 30).toFixed(1), i];
            writeStream.write(`${s.join(',')}\n`);
        }
    }


    writeStream.close(()=> {
        console.log('Gen data complete');
    })
    return;
}

main();