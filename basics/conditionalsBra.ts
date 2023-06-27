const emptyArr: string[] = [];
const testArr111: number[] = [];

if(emptyArr) {
    console.log('[] empty array evaluates to true!')
}

let filteredThingo = testArr111.filter((x) => x > 1);
console.log('filteredThingo', filteredThingo);

if(filteredThingo) {
    console.log('Yeah dude still filtered!')
}