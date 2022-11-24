const getMonth = (month: string) => {
  let input = month.toLowerCase();
  switch (input) {
    case "january":
      return 0;
    case "february":
      return 1;
    case "march":
      return 2;
    case "april":
      return 3;
    case "may":
      return 4;
    case "june":
      return 5;
    case "july":
      return 6;
    case "august":
      return 7;
    case "september":
      return 8;
    case "october":
      return 9;
    case "november":
      return 10;
    case "december":
      return 11;
  }
};

const getDayInMonth = (day: string, month: string) => {};

console.log(getMonth("January"));
console.log(getMonth("September"));
console.log(getMonth("OcToBer"));

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(capitalizeFirstLetter("foo")); // Foo

for (let i = 0; i <= 6; i++) {
  // Generate 3 different date sets in milliseconds
  const dateBoi = new Date("2024-09-18");
  const noLongerShowingPromo = dateBoi.getTime() + getRandomInt(244000, 244900);
  const promoShowingButExpired =
    dateBoi.getTime() + getRandomInt(245000, 250000);
  const promoAvailble = dateBoi.getTime() + getRandomInt(243000, 243900);

  // console.log("Promo Displaying from: ", promoAvailble);
  // console.log("Promo Greyed Out: ", promoShowingButExpired);
  // console.log("Promo No Longer Visible (Dropped): ", noLongerShowingPromo);
  console.log(promoAvailble, promoShowingButExpired, noLongerShowingPromo);
}
