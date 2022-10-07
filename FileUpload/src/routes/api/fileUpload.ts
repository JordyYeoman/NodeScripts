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

const router: Router = Router();

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

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    console.log("req.body: ", req.body);
    //
    let chunkArr = chunkFileAndUpload("src/assets/data/IRONHEART_BETA.txt");
    console.log("chunkArr: ", chunkArr);
    HeartData.create({
      data: chunkArr,
      date: Date.now(),
    });
    res.json({ msg: "Rock n Roll" });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
