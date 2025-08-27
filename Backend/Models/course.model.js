import { Schema, model } from "mongoose";

const courseSchema = Schema(
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
      enum: ["beginner", "intermediate", "advanced"]
    },
    thumbnailUrl: String,
    modules: [
      {
        title: String,
        lessons: [
          {
            type: Schema.Types.ObjectId,
            ref: "lesson"
          }
        ]
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

const Course = model("course", courseSchema);
export default Course;
