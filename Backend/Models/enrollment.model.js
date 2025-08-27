import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.Objectid,
      ref: "user"
    },
    courseId: {
      type: Schema.Types.Objectid,
      ref: "course"
    },
    completedLessons: [
      {
        lessonId: {
          type: Schema.Types.Objectid,
          ref: "lesson"
        },
        completedAt: Date
      }
    ],
    quizResults: [
      {
        quizId: {
          type: Schema.Types.Objectid,
          ref: "quiz"
        },
        score: Number,
        attemptedAt: Date
      }
    ],
    status: {
      type: String,
      enum: ["in progress", "abandoned", "completed"],
      default: "in progress"
    },
    lastAccessed: Date
  },
  {
    timestamps: true
  }
);

const Enrollment = model("enrollment", enrollmentSchema);
export default Enrollment;
