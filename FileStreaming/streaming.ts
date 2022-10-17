var fs = require("fs");

var data = [""];
var loop = 0;

var readStream = fs.createReadStream("./IRONHEART_BETA.txt", {
  highWaterMark: 50 * 1024, // Gives around 1k data points per array
  encoding: "utf8",
});

readStream
  .on("data", function async(chunk: string) {
    console.log("--------------------------------");
    console.log("Updating data?");
    console.log("Current Loop: ", loop);
    data = chunk
      .split(" ")
      .join()
      .replace(/[\r\n]/gm, "")
      .split(",");
    // Perform chunk logic
    console.log(data.length); // Get a good approximation of string array to be sent to server
    console.log(JSON.stringify(data).length * 8 * 0.000001); // Get a good approximation of string array size in Mb's to be sent to server
    // For each chunk, send an update to mongoDB
    // reset data
    data = [""];
    loop++;
    console.log("--------------------------------");
  })
  .on("end", function () {
    console.log("###################");
    console.log(data);
    console.log("loopCount: ", loop);
    // here you see all data processed at end of file
  });
