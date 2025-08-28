import { Schema, model } from "mongoose";

const userSchema = Schema(
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
    enrollments: {
      type: Schema.Types.ObjectId,
      ref: "enrollment"
    }
  },
  {
    timestamps: true
  }
);

const User = model("user", userSchema);
export default User;
