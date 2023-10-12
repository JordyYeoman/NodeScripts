const randoStuff = [20, 4000, 1251, 201, 9999, 5121];

const filteredShiz = randoStuff.filter((r) => r === 20);
console.log("filtered: ", filteredShiz);

const filterStuff = (arr: number[], alt?: number) => arr.filter((r) => (alt === undefined || r < alt));

console.log('[FILTER] filterStuff: ', filterStuff(randoStuff))
console.log('[FILTER] filterStuff: ', filterStuff(randoStuff, 4001))


const doMagix = (s: any) => {
  if(s?.length && Array.isArray(s)) {
    s.forEach((char: any) => console.log('Blah ', char));
  }
};

doMagix('hellooooooo');
doMagix(['test', 'test2', 'test3', 'test4', 'test5']);

//