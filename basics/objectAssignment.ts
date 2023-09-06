// @ts-nocheck

// const testObj = {
//     hello: 'world',
//     name: 'jordy',
//     age: 2
// }

// Object.assign({}, testObj);

// console.log('testObj', testObj);

const rand = () => (Math.random() + 1).toString(36).substring(7);

function combineBigObjects() {
  console.log("Please wait...creating the test objects...");
  const obj = {};
  const obj2 = {};

  for (let i = 0; i < 100000; i++) {
    const key = rand();
    obj[rand()] = {
      [rand()]: rand(),
      [rand()]: rand(),
    };
    obj2[rand()] = {
      [rand()]: rand(),
      [rand()]: rand(),
    };
  }
  console.log("Combine big objects using spread:");
  console.time();
  const result1 = {
    ...obj,
    ...obj2,
  };
  console.timeEnd();

  console.log("Combine big objects using assign:");
  console.time();
  Object.assign({}, obj, obj2);
  console.timeEnd();

  console.log("Combine big objects using assign, but mutates first obj:");
  console.time();
  Object.assign(obj, obj2);
  console.timeEnd();
}

combineBigObjects();

function combineSmallObjects() {
  const firstObject = () => ({ [rand()]: rand() });
  const secondObject = () => ({ [rand()]: rand() });
  console.log("Combine small objects using spread:");
  console.time();
  for (let i = 0; i < 500000; i++) {
    const finalObject = {
      ...firstObject(),
      ...secondObject(),
    };
  }
  console.timeEnd();

  console.log("Combine small objects using assign:");
  console.time();
  for (let i = 0; i < 500000; i++) {
    const finalObject = Object.assign({}, firstObject(), secondObject());
  }
  console.timeEnd();

  console.log("Combine small objects using assign, but mutates first obj:");
  console.time();
  for (let i = 0; i < 500000; i++) {
    const finalObject = Object.assign(firstObject(), secondObject());
  }
  console.timeEnd();
}

combineSmallObjects();
