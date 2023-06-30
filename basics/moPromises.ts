const moMoney: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Magic");
  }, 1000);
});

const doStuff = async () => {
  console.log("moMoney", await moMoney);
};

doStuff();
