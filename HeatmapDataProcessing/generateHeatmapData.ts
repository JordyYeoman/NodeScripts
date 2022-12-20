import fs from "fs";

const filename = 'Data.csv';
const topRow = ['group','variable','value'];
const sensorCount = 10;
const totalDataReadings = 100000;

// Open a write stream
const writeStream = fs.createWriteStream(`GENERATED-${filename}`);


// Random number generator
function randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

// Structure per loop to follow: 
// ['1', 'sensor1', 'readingOfSensor1']
// ['1', 'sensor2', 'readingOfSensor2']
// ['2', 'sensor1', 'readingOfSensor1']
// ['2', 'sensor2', 'readingOfSensor2']

function main(): void {
    // Add heading column to file
    writeStream.write(`${topRow} \n`);

    // Loop for `totaDataReadings` to generate appropriate data size
    for(let i = 0; i < totalDataReadings; i++) {  
        // New line per sensor
        for(let j = 0; j < sensorCount; j++) {
            let s = [i, j, randomNumber(18, 30).toFixed(2)];
            writeStream.write(`${s.join(',')} \n`);
        }
    }


    writeStream.close(()=> {
        console.log('Gen data complete');
    })
    return;
}

main();