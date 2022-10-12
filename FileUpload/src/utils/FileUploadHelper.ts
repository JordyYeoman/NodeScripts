import { models } from "mongoose";
import HeartData from "../models/HeartData";
import { sleep } from "./Sleep";
import { compress } from "./Compression";

var fs = require("fs");

export const chunkFileAndUpload = (file: Express.Multer.File, date: string) => {
  var data: string = "";
  var readStream = fs.createReadStream(file.path, {
    highWaterMark: 25 * 1024, // Gives around 5k data points per array
    encoding: "utf8",
  });

  readStream
    .on("data", async function (chunk: string) {
      data = await compress(
        chunk
          .split(" ")
          .join()
          .replace(/[\r\n]/gm, "")
      );
      // Perform chunk logic
      let sizeEstimate = JSON.stringify(data).length * 8 * 0.000001; // Get a good approximation of string array size in Mb's to be sent to server

      // For each chunk, send an update to mongoDB
      // including a time sample for sorting chunks in future
      let newChunk = new HeartData({
        data: data,
        date: date,
        chunkTime: new Date().getTime() / 10000000,
        sizeEstimate: sizeEstimate,
      });

      await newChunk
        .save()
        .then((item: any) => {
          console.log(item, ": item saved to database");
        })
        .catch((err: Error) => {
          console.log(err, ": Unable to save to database");
        });

      // reset data
      data = "";
    })
    .on("end", function () {
      console.log("###################");
      // console.log(data);
      // here you see all data processed at end of file
    });
};
