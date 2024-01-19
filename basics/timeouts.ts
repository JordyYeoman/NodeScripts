setTimeout(() => {
  console.log("Do magic");

  setTimeout(() => {
    console.log("Mo Magic");

    setTimeout(() => {
      console.log("Mo Money Mo Problems");

      setTimeout(() => {
        console.log("Nesting for dayzzz");
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
