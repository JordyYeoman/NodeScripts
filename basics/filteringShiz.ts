const filterMeDaddy = (x: any[]) => {
  return x.filter((x) => x);
};

const doSomethingBra = (x: any[]) => {
  az.forEach((z: any) => {
    console.log(z);
    if (z === 0) {
      return;
    }
    console.log("Loop still running");
  });
};

const az = ["0", 0, undefined, null, "hello"];

console.log("filter: ", filterMeDaddy(az));
console.log("Full send: ", filterMeDaddy(filterMeDaddy(az)));

console.log("forEach", doSomethingBra(az));
