// Regex route name matching
const routes = ["/racing", "/beastmode"];

// Check if any of these contain `racing`
const pathMatch = "racing";
console.log(routes.map((str: string) => str.includes(pathMatch)));
