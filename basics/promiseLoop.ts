const data = [
  "jordy",
  "robin",
  "nikhil",
  "chloe",
  "jiang",
  "gwen",
  "cass",
  "per",
];

// Dummy promise to handle each iteration of loop
const myPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("Count");
    }, 1000);
  });

const doMagic = async () => {
  for (let i = 0; i < data.length; i++) {
    let x = await myPromise();
    console.log("x", x);
  }
};

const morePromises = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Sent it!");
    }, 2000);
  });

const doMoreMagic = async () => {
  for (let i = 0; i < data.length; i++) {
    let x = await morePromises();
    console.log("x", x);
  }
};

// doMagic();
doMoreMagic();
