var fs = require("fs");

export const chunkFileAndUpload = (filePath: string) => {
  let chunkArr: string[] = [];
  var data = "";

  var readStream = fs.createReadStream(filePath, {
    highWaterMark: 1 * 1024,
    encoding: "utf8",
  });

  return readStream
    .on("data", function (chunk: string) {
      chunkArr.push(
        chunk
          .split(" ")
          .join()
          .replace(/[\r\n]/gm, "")
      );
    })
    .on("end", function () {
      console.log("###################");
      console.log("chunk: ", chunkArr);
      return chunkArr;
      // here you see all data processed at end of file
    });
};
