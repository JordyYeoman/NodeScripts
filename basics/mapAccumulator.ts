const j = new Map([
    ['person1', {}],
    ['person2', {}]
]);

const testArr = [1,2,3,4,5,6,7,8,9,10,11,12];

const testMapAccumulator = testArr.reduce((acc, b) => {
    acc.set('person1', {
        [b]: {
            more: 'shit',
            index: b
        }
    });
    return acc;
}, j);

console.log('testMapAccumulator', testMapAccumulator);


j.set('person1', {
    ['test']: {
        more: 'shit'
    }
});
