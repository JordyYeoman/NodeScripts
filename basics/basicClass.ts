export class Person {
  ageVal: number = 0;
  nameVal: string = "";

  constructor() {}

  set name(name: string) {
    this.nameVal = name;
  }

  get name() {
    return this.nameVal;
  }
}

const p = new Person();
p.name = "George";
console.log("Value: ", p.name);
