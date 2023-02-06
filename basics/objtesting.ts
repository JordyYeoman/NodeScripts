const tz = {
  hello: "hello",
};

if (!("hello" in tz)) {
  console.log("hello is in tz");
}

if (!("pro" in tz)) {
  console.log("pro is not in tz");
}
