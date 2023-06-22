const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "foo");
});
const promise4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "foo");
});

const handlePromises = async (): Promise<any> => {
  const res = await Promise.all([promise1, promise2, promise3, promise4])
    .then((values) => {
      return values;
    })
    .catch(() => {
      return null;
    });

  return res;
};

const doStuff = async () => {
  let handledBra = await handlePromises();
  console.log("handledBra", handledBra);
};

doStuff();

const promise = () => {
   return new Promise((resolve, reject) => {
    // executor (the producing code, "singer")
    setTimeout(() => {
      resolve('YAYYAYA')
    }, 250);
  });
}

const promiseDos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Stand by to get some')
    }, 300);
  });
}

const doSomething = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Its Friday, we've made it through the week.")
      }, 400);
  });
};

// You have to return a promise
doSomething()
  .then(promise)
  .then(promiseDos)
  .then(() => {
    setTimeout(()=> {
      console.log("Violence, Speed and Momentum");
    }, 1000);
  })