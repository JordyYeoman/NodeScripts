import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "./User";

/**
 * Interface to model the HeartData Schema for TypeScript.
 * @param user:ref => User._id
 * @param firstName:string
 * @param lastName:string
 * @param username:string
 */
export interface IProfile extends Document {
  user: IUser["_id"];
  firstName: string;
  lastName: string;
  username: string;
}

const heartDataSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  data: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const Profile: Model<IProfile> = model("Profile", profileSchema);
const Profile: any = model("HeartData", heartDataSchema);

export default Profile;
