import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: String,
    description: String,
    instructorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    price: Number,
    payment: {
      type: String,
      enum: ["paid", "free"],
      default: "paid",
    },

    category: String,
    tags: [String],
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    thumbnailUrl: String,
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "lesson",
      },
    ],
    ratings: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        rating: Number,
        message: String,
      },
    ],
  },
  { timestamps: true }
);

const lessonSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
  },
  title: String,
  content: {
    text: String,
    video: String,
    files: [String],
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "quiz",
  },
});
const Course = model("course", courseSchema);
export default Course;
