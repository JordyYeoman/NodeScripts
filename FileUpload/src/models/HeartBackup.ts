import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./User";

/**
 * Interface to model the HeartBackup Schema for TypeScript.
 * @param data:string[]
 * @param date:Date
 */
const heartBackupSchema: Schema = new Schema({
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
const HeartBackup: any = model("HeartBackup", heartBackupSchema);

export default HeartBackup;
