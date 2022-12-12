import fs from "fs";
import readline from "readline";

// --- Day 4: Camp Cleanup ---

const filename = 'input.txt';
let pairsContained = 0;
let data: string[] = fs.readFileSync(filename, 'utf8').split('\n');

const getSideWithHighestNumber = (l: string[], r: string[]): string => {
    let lNum = parseInt(l[1]); 
    let rNum = parseInt(r[1]);
    if(lNum === rNum) {
        return '';
    };
    if(lNum >rNum) {
        return 'LEFT';
    }
    return 'RIGHT';
};

data.map((pair: string)=> {
    // Get Left and right sides
    let leftSide = pair.split(',')[0].split('-');
    let rightSide = pair.split(',')[1].split('-');

    // Find the highest number of the lot - either left[1] or right [1]
    let side = getSideWithHighestNumber(leftSide, rightSide);
    
    if(side === 'LEFT') {
       if( leftSide[0] < rightSide[0]) {
        console.log('leftside[0', leftSide[0], rightSide[0])
        pairsContained += 1;
       } // Right side fully contained in left side
    }
    if(side === 'RIGHT') {
        if (rightSide[0] < leftSide[0]) {
            pairsContained += 1;
        } // Left side fully contained in right side
    }

})

console.log('Pairs contained: ', pairsContained);