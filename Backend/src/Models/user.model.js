import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
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
        default: new Date(Date.now() + 5 * 60 * 1000)
      }
    }
  },
  {
    timestamps: true
  }
);

const User = model("user", userSchema);
export default User;
