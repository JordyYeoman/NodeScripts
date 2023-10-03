type Person = {
    name: string,
    age: number,
}

type DogLover = {
    lovesDogs: boolean,
    hasDog: boolean,
}

type BigDog = {
    horseSize: boolean,
}

// Combination of types
type PersonWhoLovesDogs = Person & DogLover & BigDog;

const jordy = {
    name: 'Jordy',
    age: 28,
    lovesDogs: true,
    hasDog: true,
    horseSize: true,
} satisfies PersonWhoLovesDogs;

const x = [1, 2, 3];
const y = x.slice(0, 10);
console.log('y: ', y);