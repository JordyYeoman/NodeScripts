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

const promise = (t: number) => {
   return new Promise((resolve, reject) => {
    // executor (the producing code, "singer")
    setTimeout(() => {
      console.log('YAYYAYA');
      resolve(t)
    }, 250);
  });
}

const promiseDos = (d: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Stand by to get some')
      resolve(d + 1)
    }, 300);
  });
}

const doSomething = (z: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Its Friday, we've made it through the week.")
        resolve(z + 1);
      }, 400);
  });
};

// You have to return a promise
doSomething(1)
  .then((res) => promise(res as number))
  .then((res) => promiseDos(res as number))
  .then((res) => {
    setTimeout(()=> {
      console.log("Violence, Speed and Momentum");
      console.log('Final res: ', res);
    }, 1000);
  })