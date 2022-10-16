import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./User";

/**
 * Interface to model the HeartData Schema for TypeScript.
 * @param data:string[]
 * @param date:Date
 */
const heartDataSchema: Schema = new Schema(
  {
    data: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    chunkCount: {
      type: Number,
      default: 0,
    },
    chunkTime: {
      type: String,
      default: "",
    },
    sizeEstimate: {
      type: Number,
      default: 0,
    },
    compressionType: {
      type: String,
      default: "UTF16",
    },
  },
  { collection: "heartData" }
);

// const Profile: Model<IProfile> = model("Profile", profileSchema);
const HeartData: any = model("HeartData", heartDataSchema);

export default HeartData;
