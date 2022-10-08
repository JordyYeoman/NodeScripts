import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./User";

/**
 * Interface to model the HeartData Schema for TypeScript.
 * @param data:string[]
 * @param date:Date
 */
const heartDataSchema: Schema = new Schema({
  location: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const Profile: Model<IProfile> = model("Profile", profileSchema);
const HeartData: any = model("HeartData", heartDataSchema);

export default HeartData;
