const testObj = {
  test: {
    test: {
      name: "jordy",
      lastName: "",
      big: "INT",
      hasNothing: null,
    },
    moMoney: {
      accountVal: 10000,
      deadly: true,
      money: undefined,
      test: null,
      hey: "",
      furtherNesting: {
        bra: [1, 2, 3],
        nope: [],
        emptyArr: [],
        test: {},
      },
    },
  },
};

// Goal - recursively check all object and their values ensuring they are valid
// Invalid cases:
//  - Empty Objects (No Keys)
// Null, undefined, '' (empty string)
// empty array []

const validateFields = (obj: any): Object => {
  const newObj: any = {}; // Used to write to DB.

  Object.keys(obj).forEach((key: string) => {
    if (!isEmpty(obj[key])) {
      newObj[key] = obj[key];
    }
  });

  console.log("newObj", newObj);
  return newObj;
};

const isEmpty = (value: unknown) =>
  value === undefined || // obv undefined check :P
  value === null || // Obv null check ;)
  (typeof value === "object" && Object.keys(value).length === 0) || // Empty Object
  (typeof value === "string" && value.trim().length === 0) || // Empty String
  (Array.isArray(value) && !value?.length); // Empty Arr

// Test cases for isEmpty

const emptyObj: any = {};
const emptyString: any = "";
const emptyArr: any = [];

console.log("isEmpty emptyObj", isEmpty(emptyObj));
console.log("isEmpty emptyString", isEmpty(emptyString));
console.log("isEmpty emptyArr", isEmpty(emptyArr));
