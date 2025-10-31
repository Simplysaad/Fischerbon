import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "payment",
    },
    completedLessons: [
      {
        lessonId: {
          type: Schema.Types.ObjectId,
          ref: "lesson",
        },
        completedAt: Date,
      },
    ],
    quizResults: [
      {
        quizId: {
          type: Schema.Types.ObjectId,
          ref: "quiz",
        },
        score: Number,
        attemptedAt: Date,
      },
    ],
    status: {
      type: String,
      enum: ["in progress", "abandoned", "completed"],
      default: "in progress",
    },
    lastAccessed: Date,
    // referral: {
    //   type: Schema.Types.ObjectId,
    //   ref: "referral"
    // }
  },
  {
    timestamps: true,
  }
);

const Enrollment = model("enrollment", enrollmentSchema);
export default Enrollment;
