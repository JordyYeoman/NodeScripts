const myMap = new Map<string, number>();
myMap.set('one', 1);
myMap.set('two', 2);
myMap.set('three', 3);

for (const [key, value] of myMap) {
  console.log(key, value);
}