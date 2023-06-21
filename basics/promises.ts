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

// The constructor syntax for a promise object is:

let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});