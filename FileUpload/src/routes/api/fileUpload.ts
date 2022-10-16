import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import auth from "../../middleware/auth";
import Request from "../../types/Request";
import HeartData from "../../models/HeartData";
import { chunkFileAndUpload } from "../../utils/FileUploadHelper";
import multer from "multer";
import HeartBackup from "../../models/HeartBackup";
import { decompress } from "../../utils/Compression";
import { check, validationResult } from "express-validator/check";

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
      const date = req.file.filename.split("-")[1].split(".")[0];

      // 2. Save location of the uploaded file to the mongodb database
      await HeartBackup.create({
        location: req.file.path,
        date: date,
      });

      // 3. Chunk data & upload to mongoDB
      chunkFileAndUpload(req.file, date);
      res.json({ msg: "Rock n Roll", fileLocation: req.file.path });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.get("/allData", auth, async (req: Request, res: Response) => {
  try {
    let compressedChunk = await HeartData.find({}).limit(5);
    if (compressedChunk && compressedChunk.length > 0) {
      let decompressedData = await decompress(compressedChunk[0].data);
      res.json({ data: decompressedData });
    } else {
      res.json({ data: [] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.get("/latest", auth, async (req: Request, res: Response) => {
  try {
    let data = await HeartData.find().sort({ $natural: 1 }).limit(5);
    if (data) res.json(data);
    throw new Error();
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

router.post(
  "/data",
  // [
  [auth, upload.none()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    try {
      const {
        dateRangeLower,
        dateRangeUpper,
        chunkRangeLower,
        chunkRangeUpper,
      } = req.body;
      let data = await HeartData.find({
        date: {
          $gte: new Date(dateRangeLower).toISOString(),
          $lt: new Date(dateRangeUpper).toISOString(),
        },
        chunkCount: {
          $gte: chunkRangeLower,
          $lte: chunkRangeUpper,
        },
      });
      res.json({ data });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

export default router;
