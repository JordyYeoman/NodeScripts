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

var storage = multer.diskStorage({
  destination: "data/ironheart",
  filename: function (req, file, cb) {
    cb(null, "DATA_ENTRY-" + Date.now() + ".txt");
  },
});

var upload = multer({ storage: storage });

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
  [auth, upload.single("UPLOADED_FILE")],
  async (req: Request, res: Response) => {
    try {
      // 1. Upload file to DigitalOcean 'droplet' for file storage (location of server)
      // Handled by Multer .upload.single()

      // 2. Save location of the uploaded file to the mongodb database
      await HeartData.create({
        location: req.file.path,
        // Extract date value from Multer
        date: req.file.filename.split("-")[1].split(".")[0],
      });

      res.json({ msg: "Rock n Roll", fileLocation: req.file.path });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

export default router;