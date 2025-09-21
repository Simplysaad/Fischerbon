import { Document, Schema, Types, model } from "mongoose";

interface IUser extends Document {
  name: string;
  emailAddress: string;
  password: string;
  role: "student" | "instructor" | "admin";
  profilePicture?: string;
  bio?: string;
  enrollments?: Types.ObjectId[];
  authentication?: {
    token?: string,
    tokenExpiry?: Date
  }
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student"
    },
    profilePicture: String,
    bio: String,
    enrollments: [
      {
        type: Schema.Types.ObjectId,
        ref: "enrollment"
      }
    ],
    authentication: {
      token: String,
      tokenExpiry: {
        type: Date,
        default: new Date(Date.now() + (5 * 60 * 1000))
      },
    }
  },
  {
    timestamps: true
  }
);

const User = model<IUser>("user", userSchema);
export default User;
