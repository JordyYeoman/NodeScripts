const myPromise = () =>
  new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("Count");
    }, 1000);
  });

const waitNVueRenderCycles = async (numOfTicksToWait: number) => {
  for (let i = 0; i < numOfTicksToWait; i++) {
    await myPromise();
  }
};

const doStuffSynchronously = async () => {
  await waitNVueRenderCycles(3);
  console.log("All done!");
};

const doStuffSynchronously2 = () => {
  waitNVueRenderCycles(3);
  console.log("All done 2!");
};

// doStuffSynchronously();
doStuffSynchronously2();
