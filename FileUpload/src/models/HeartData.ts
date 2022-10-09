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
      type: Array<String>,
      default: [""],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    chunk: {
      type: Number,
      default: 0,
    },
    sizeEstimate: {
      type: Number,
      default: 0,
    },
  },
  { collection: "heartData" }
);

// const Profile: Model<IProfile> = model("Profile", profileSchema);
const HeartData: any = model("HeartData", heartDataSchema);

export default HeartData;
