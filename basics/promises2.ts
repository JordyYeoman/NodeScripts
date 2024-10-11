const p = (x: number) => new Promise(r => {
  setTimeout(() => {
    console.log(`Awaiting: ${x} seconds`);
    r('world');
  }, x * 1000);
});

const doStuff = async () => {
  for (let i = 0; i < 5; i++) {
    await p(i);
  }
}

doStuff();