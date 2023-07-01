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

/// Further obj comparison
const user = {
  advertiserDetails: {
    primaryTags: [],
    secondaryTags: [],
    companyName: "Testing",
    companyPhoneNumber: "04001101111",
    companyAddress: "Deadly 123 Manjimup",
    companyEmail: "test@gmail.com",
    companyWebsite: "bigdog.com.au",
  },
  __v: 0,
  account_status: "pending",
  articles: [],
  chats: [],
  events: [],
  feeds: [],
  firstName: "Jordy",
  groups: [],
  lastName: "Yeamannn",
  products: [],
  profileProvider: "google",
  projects: [],
  tags: ["Flathead V8", "V8 Supercars", "V8", "V8 Touring Car", "V8 Engine"],
  completedInitialProfileSetup: true,
  referralCode: "SENDITHARDBABY",
};

const fieldsToUpdate = {
  firstName: "BigOrse",
  lastName: "Yeamannn",
  advertiserDetails: {
    primaryTags: ["v8", "sendingit", "bro"],
    secondaryTags: ["LSWorld", "always", "sendit"],
    companyName: "Testing",
    companyPhoneNumber: "04001101111",
    companyAddress: "Deadly 123 Manjimup",
    companyEmail: "test@gmail.com",
    companyWebsite: "bigdog.com.au",
  },
};

const isValidObject = (value: unknown): boolean =>
  value !== undefined &&
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.keys(value).length > 0;

// 1. Loop through the new object of key value pairs to update on the original object.
const loopThroughNewFieldsObj = (newFieldsObj: any, objToUpdate: any) => {
  // Obj to update
  const updatedObj = objToUpdate;

  for (const [key, value] of Object.entries(newFieldsObj)) {
    // 2. If each key/value pair is another object, we need to loop through that object (recursive call)
    if (isValidObject(value)) {
      loopThroughNewFieldsObj(value, updatedObj);
    } else if (!isEmpty(value)) {
      // 3. If we find a key/value pair that is valid - we then find that existing key in the original object and update it
      findAndUpdateObjectKeyPair(key, value, updatedObj);
    }
  }

  return updatedObj;
};

// Recursively search through the original object to find the correct matching key.
const findAndUpdateObjectKeyPair = (
  key: string,
  value: any,
  objToUpdate: any
) => {
  // Find the pair in original object
  for (const [objToUpdateKey, objToUpdateValue] of Object.entries(
    objToUpdate
  )) {
    // If nested objects... loop through them first
    if (isValidObject(objToUpdateValue)) {
      findAndUpdateObjectKeyPair(key, value, objToUpdateValue);
      // loopThroughNestedObjectAndUpdate(objToUpdateKey, value, updatedObj);
    } else if (objToUpdateKey === key) {
      objToUpdate[key] = value;
    }
  }
};

console.log("================================");
console.log("================================");
const pl = loopThroughNewFieldsObj(fieldsToUpdate, user);
console.log("updated payload: ", pl);
console.log("================================");
console.log("================================");
