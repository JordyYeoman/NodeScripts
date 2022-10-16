import express from "express";
import connectDB from "../config/database";
import auth from "./routes/api/auth";
import user from "./routes/api/user";
import cors from "cors";
import profile from "./routes/api/profile";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "./routes/api/fileUpload";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.use(morgan("dev"));
// TODO
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.set("port", process.env.PORT || 5000);
// app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/fileUpload", fileUpload);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
