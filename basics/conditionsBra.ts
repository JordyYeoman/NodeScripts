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

if (undefined < 0) {
    console.log('')
}