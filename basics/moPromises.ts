const moMoney = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1000);
  }, 1000);
});

const doStuff = async () => {
  console.log("moMoney", await moMoney);
};
