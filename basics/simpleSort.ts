const items = [
    { name: "Edward", value: 21 },
    { name: "Sharpe", value: 37 },
    { name: "And", value: 45 },
    { name: "The", value: -12 },
    { name: "Magnetic", value: 13 },
    { name: "Zeros", value: 37 },
  ];

  let simplySorted = items.sort((a, b) => a.value - b.value);
  console.log('simplySorted', simplySorted);


  let filtered = items.filter(item => item.value < 0); // returns only truthy evaluated expressions
  console.log('filtered', filtered);