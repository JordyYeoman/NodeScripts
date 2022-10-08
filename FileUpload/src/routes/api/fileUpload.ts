import bcrypt from "bcryptjs";
import config from "config";
import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

import auth from "../../middleware/auth";
import Payload from "../../types/Payload";
import Request from "../../types/Request";
import User, { IUser } from "../../models/User";
import HeartData from "../../models/HeartData";
import { chunkFileAndUpload } from "../../utils/FileUploadHelper";
import fs from "fs";
import multer from "multer";
import { fileFilter } from "../../utils/multerConfig";

const router: Router = Router();
const upload = multer({
  dest: "data/",
  filename: function (req, file, cb) {
    //req.body is empty...
    //How could I get the new_file_name property sent from client here?
    cb(null, file.originalname + "-" + Date.now() + ".pdf");
  },
});

// @route   GET api/auth
// @desc    Get authenticated user given the token
// @access  Private
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    // do something
    res.json({ msg: "Rock n Roll" });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

// router.post("/", auth, async (req: Request, res: Response) => {
router.post(
  "/",
  upload.single("UPLOADED_FILE"),
  (req: Request, res: Response) => {
    console.log("ENDPOINT HIT");
    try {
      console.log("req.file", req.file);
      // 1. Upload file to DigitalOcean 'droplet' for file storage (location of server)
      const date = Date.now();
      const filePath = `data/ironheart/${date}.txt`;

      // 2. Save location of the uploaded file to the mongodb database
      // let response = await HeartData.create({
      //   location: filePath,
      //   date: date,
      // });
      // console.log("res after saving?? ", response);
      // 3. Add ability to download/request that data on the fly from the web app
      res.json({ msg: "Rock n Roll", fileLocation: filePath });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

export default router;
