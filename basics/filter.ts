const test = [
    {name: 'jordy', age: 12, group: 'C'},
    {name: 'tim', age: 2, group: 'QA'},
    {name: 'bob', age: 5, group: 'DL'}
]


let x = test.filter((person) => person.group === 'C');
console.log('x',x)

let y = test.filter((person) => person.age < 10);
console.log('y',y)