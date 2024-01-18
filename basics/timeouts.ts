setTimeout(() => {
  console.log("Do magic");

  setTimeout(() => {
    console.log("Mo Magic");

    setTimeout(() => {
      console.log("Mo Money Mo Problems");
    }, 1000);
  }, 1000);
}, 1000);
