for (let i = 1; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// 1,2,3,4
for (var i = 1; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// 5,5,5,5
