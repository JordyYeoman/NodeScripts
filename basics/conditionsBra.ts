let x1 = true;
let y2 = false;
let z3 = false;

if (!x1 || y2 || z3) {
    console.log('Whatttt you silly')
}

let testObj = {
    tools: {
        hammer: {
            dualWield: [
                'axe'
            ],
            strength: 2,
            durability: 1
        },
        axe: {
            dualWield: [
                'hammer'
            ],
            strength: 3,
            durability: 2
        }
    }
}

if(testObj?.tools?.hammer?.dualWield) {
    console.log('Hammer is good!');
}

if(testObj?.tools?.axe?.dualWield?.length > 0) {
    console.log('Axe is good!')
}

if({}) {
    console.log('Empty object truthy??');
}

const ttt = {
    l: undefined,
    j: 2,
    h: 'i',
} as {
    l: unknown,
    j: number,
    h: string
}

console.log('ttt.l as number < 0', ttt.l as number < 0);
if (ttt.l as number < 0) {
    console.log('Is undefined less than 0?')
}

const testArr = [
    'hello',
    'world',
    'its',
    'me',
    'great',
];
const t: string[] = [];
for (let i = 0; i < 100000; i++) {
    t.push(...testArr)
}
console.log('t.length', t.length);

// ForEach
const perf = performance.now();
t.forEach(x => x.indexOf(''));
console.log('forEach perf: ', performance.now() - perf);

// Some
const perf2 = performance.now();
t.some(x => x.indexOf(''));
console.log('some perf: ', performance.now() - perf2);

// Find
const perf3 = performance.now();
t.find(x => x.indexOf(''));
console.log('find perf: ', performance.now() - perf3);

// For 
const perf4 = performance.now();
for(let i = 0; i < t.length; i++) {
    t[i].indexOf('');
}
console.log('basic for perf: ', performance.now() - perf4);

// For in
const perf5 = performance.now();
for(let thing in t) {
    thing.indexOf('');
}
console.log('for in perf: ', performance.now() - perf5);