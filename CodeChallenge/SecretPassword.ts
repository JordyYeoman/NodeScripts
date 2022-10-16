const getNumForLetter = (char: string) => {
  switch (char) {
    case "a":
      return 1;
    case "b":
      return 2;
    case "c":
      return 3;
    case "d":
      return 4;
    case "e":
      return 5;
    case "f":
      return 6;
    case "g":
      return 7;
    case "h":
      return 8;
    case "i":
      return 9;
    case "j":
      return 10;
    case "k":
      return 11;
    case "l":
      return 12;
    case "m":
      return 13;
    case "n":
      return 14;
    case "o":
      return 15;
    case "p":
      return 16;
    case "q":
      return 17;
    case "r":
      return 18;
    case "s":
      return 19;
    case "t":
      return 20;
    case "u":
      return 21;
    case "v":
      return 22;
    case "w":
      return 23;
    case "x":
      return 24;
    case "y":
      return 25;
    case "z":
      return 26;
    default:
      return 0;
  }
};

const secretPassword = (msg: string): string | number => {
  if (msg.length > 9) return "BANG! BANG! BANG!";

  let chunkedStr = msg.match(/.{1,3}/g);
  let newChunk: any[] = [];

  chunkedStr?.forEach((chunk: string) => {
    let split = chunk.split("");
    let parsedArr = split.map((letter: string, index: number) => {
      if (index === 1) return letter;
      return getNumForLetter(letter.toLowerCase());
    });
    newChunk.push(...parsedArr);
  });
  console.log(newChunk.join(""));
  return 0;
};

console.log(secretPassword("mubashirh"));
