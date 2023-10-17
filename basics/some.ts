const testingSomeShiz: any[] = [];
const testingMoreShize = undefined as unknown as any[];

console.log('Testing: ', !testingSomeShiz.some((x) => x === 1))
console.log('Testing2: ', !testingMoreShize?.some((x) => x === 1))