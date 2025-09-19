import { ObjectId, Types } from "mongoose";
import { Document, Schema, model } from "mongoose";

interface IEnrollment extends Document {
  userId: ObjectId;
  courseId: ObjectId;
  paymentId: ObjectId;
  completedLessons: {
    lessonId: Schema.Types.ObjectId;
    completedAt: Date;
  }[];
  quizResults: {
    quizId: Types.ObjectId;
    score: number;
    attemptedAt: Date;
  }[];
  status: "in progress" | "abandoned" | "completed";
  lastAccessed: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course"
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "payment"
    },
    completedLessons: [
      {
        lessonId: {
          type: Schema.Types.ObjectId,
          ref: "lesson"
        },
        completedAt: Date
      }
    ],
    quizResults: [
      {
        quizId: {
          type: Schema.Types.ObjectId,
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

const Enrollment = model<IEnrollment>("enrollment", enrollmentSchema);
export default Enrollment;
