import { Document, Schema, model, Types } from "mongoose";

interface ICourse extends Document {
  title: string;
  description: string;
  instructorId: Types.ObjectId;
  price: number;
  payment: "paid" | "free";
  category: string;
  tags: string[];
  level: "beginner" | "intermediate" | "advanced";
  thumbnailUrl: string;
  lessons: Types.ObjectId[];
  ratings: {
    userId: Schema.Types.ObjectId;
    rating: number;
    message: string;
  }[];
}

const courseSchema = new Schema<ICourse>(
  {
    title: String,
    description: String,
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    price: Number,
    payment: {
      type: String,
      enum: ["paid", "free"],
      default: "paid"
    },

    category: String,
    tags: [String],
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner"
    },
    thumbnailUrl: String,
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "lesson"
      }
    ],
    ratings: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user"
        },
        rating: Number,
        message: String
      }
    ]
  },
  { timestamps: true }
);

const Course = model<ICourse>("course", courseSchema);
export default Course;
