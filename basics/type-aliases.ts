type Person = {
    name: string,
    age: number,
}

type DogLover = {
    lovesDogs: boolean,
    hasDog: boolean,
}

type PersonWhoLovesDogs = Person & DogLover;

const jordy = {
    name: 'Jordy',
    age: 28,
    lovesDogs: true,
    hasDog: true,
} satisfies PersonWhoLovesDogs;