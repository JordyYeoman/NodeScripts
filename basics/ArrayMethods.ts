const testArray = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const filterArrBasedOnNum = (
  lessThanOrEqualTo: number,
  arr: number[]
): number[] => arr.filter((val) => val <= lessThanOrEqualTo);

console.log("result: ", filterArrBasedOnNum(15, testArray));

const filterOnBool = (condition: boolean, arr: number[]): number[] =>
  arr.filter((val) => condition);

console.log("Filter on true: ", filterOnBool(true, testArray));
console.log("Filter on false: ", filterOnBool(false, testArray));
console.log("Filter on true: ", filterOnBool(Boolean("True"), testArray));

const w = { eventId: '124jkljb3krl1lh124vas' }
const t = { eventId: 'lkh1llhvlabdkg;124va1' }
const weirdArr = [w,t];

// const objTest11 = {
//   eventId: 'bwe;gkjwpkefw',
//   id: 'ljgqewgf',
//   name: 'hello',
//   number: 4
// }

// Object.values(objTest11).filter(([, { eventId}]) => {
//   console.log('[DEBUG] eventId: ', eventId);
// })

// weirdArr.filter(([, { eventId}]) => {
//   console.log('[DEBUG] eventId: ', eventId);
// })