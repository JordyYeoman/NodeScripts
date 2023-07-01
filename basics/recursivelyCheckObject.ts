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

const simpleTest = (val: any) => {
  return Object.keys(val).length > 0;
};

console.log("simpleTest", simpleTest({}));
console.log("simpleTest", simpleTest({ hello: "world" }));

// Goal - recursively check all object and their values ensuring they are valid
// Invalid cases:
//  - Empty Objects (No Keys)
// Null, undefined, '' (empty string)
// empty array []

const validateFields = (obj: any): Object => {
  const newObj: any = obj; // Used to write to DB.

  // Loop over object keys
  Object.keys(obj).forEach((key: string) => {
    // if is object - recursively call
    if (
      obj[key] !== undefined &&
      obj[key] !== null &&
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key]) &&
      Object.keys(obj[key]).length > 0
    ) {
      console.log("Validating another obj: ", obj[key]);
      validateFields(obj[key]);
      // If not an object, check the key value pairs for valid fields,
      // and if they are not valid - remove from obj
    } else if (isEmpty(obj[key])) {
      delete newObj[key];
    }
  });

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

const notEmptyObj: any = { hello: "world" };
const notEmptyString: any = "hello";
const notEmptyArr: any = [1, 2, 3];

console.log("isEmpty notEmptyObj", isEmpty(notEmptyObj));
console.log("isEmpty notEmptyString", isEmpty(notEmptyString));
console.log("isEmpty notEmptyArr", isEmpty(notEmptyArr));

// Final test - using a large nested obj
const x: any = validateFields(testObj);
console.log("x", x);
console.log("x", JSON.stringify(x));
