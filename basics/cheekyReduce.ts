// Just some simple reduce() practice
// Cool ways to utilize the reduce method

const array1 = [1, 2, 3, 4];

const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(sumWithInitial);

const strs = ["Hi", " how", " are", " you?"];
const fullSentence = strs.reduce((x, y) => x.concat(y), "");
console.log(fullSentence);

// Getting average totals of array
const topSix = [
  { name: "Nigeria", position: "1st", points: 43 },
  { name: "England", position: "2nd", points: 37 },
  { name: "USA", position: "3rd", points: 35 },
  { name: "South Africa", position: "4th", points: 30 },
  { name: "Brazil", position: "5th", points: 27 },
  { name: "Korea", position: "6th", points: 23 },
];

type Country = {
  name: string;
  position: string;
  points: number;
};

const totalPoints = topSix.reduce((x: number, y: Country) => x + y.points, 0);
console.log("total points: ", totalPoints);

// Count occurrences of elements
const fruits = [
  "Banana",
  "Orange",
  "Apple",
  "Orange",
  "Pear",
  "Banana",
  "Pear",
  "Pear",
];

const occurrences = fruits.reduce((x: any, y: string) => {
  return { ...x, [y]: (x[y] || 0) + 1 };
}, {});
console.log("occurrences: ", occurrences);

// Reduce an array of objects to a single object - awesome!
const studentsArray = [
  { name: "Kingsley", score: 70, position: "1st" },
  { name: "Jack", score: 80, position: "2nd" },
  { name: "Joe", score: 63, position: "3rd" },
  { name: "Beth", score: 75, position: "4rd" },
  { name: "Kareem", score: 59, position: "5th" },
  { name: "Sarah", score: 93, position: "6th" },
];

// 1. Reduce the above to a single object linking each name to score & return the obj
const studentsScores = studentsArray.reduce((acc, student) => {
  return { ...acc, [student.name]: student.score };
}, {});
console.log("studentsScores", studentsScores);

// 2. Reduce the above to a single object linking each name to position & return the obj
const studentPositions = studentsArray.reduce((acc, student) => {
  return { ...acc, [student.name]: student.position };
}, {});
console.log("studentPositions", studentPositions);

// Find the max or min values in an array
const students = [
  { name: "Kingsley", score: 70 },
  { name: "Jack", score: 80 },
  { name: "Joe", score: 63 },
  { name: "Beth", score: 75 },
  { name: "Kareem", score: 59 },
  { name: "Sarah", score: 93 },
];

const { min, max } = students.reduce(
  (acc: any, student: any) => {
    return {
      min: acc.min > student.score ? student.score : acc.min,
      max: acc.max < student.score ? student.score : acc.max,
    };
  },
  { min: 100, max: 0 }
);

console.log("min", min);
console.log("max", max);

// Flatten a list of arrays into a single array
const arrOfArrs = [
  ["aaron", "ake", "anna", "aje"],
  ["becky", "ben", "bright"],
  ["cara", "chris"],
  ["david", "daniel", "danielle", "djenue"],
];

const newArr = arrOfArrs.reduce((acc, y) => acc.concat(y), []);
console.log("newArr", newArr);
const newArr2 = arrOfArrs.reduce((acc, y) => [...acc, ...y], []);
console.log("newArr2", newArr2);
