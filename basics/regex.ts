// Regex route name matching
const routes = [
  "/racing/au-nz",
  "/racing/domestic",
  "/racing/international",
  "/horse-racing",
  "/horse-racing/au-nz",
  "/horse-racing/domestic",
  "/horse-racing/international",
  "/harness-racing",
  "/harness-racing/au-nz",
  "/harness-racing/domestic",
  "/harness-racing/international",
  "/greyhound-racing",
  "/greyhound-racing/au-nz",
  "/greyhound-racing/domestic",
  "/greyhound-racing/international",
  "/sports/blah",
  "/sports/:id/:name",
];

// Check if any of these contain `racing`
const pathMatch = "racing";
console.log(routes.map((str: string) => str.includes(pathMatch)));
