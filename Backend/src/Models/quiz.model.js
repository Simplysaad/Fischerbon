import { Schema, model } from "mongoose";

const quizSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course"
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: "lesson"
    },
    title: String,
    questions: [
      {
        _id: false,
        text: {
          type: String,
          required: true
        },
        options: [
          {
            text: String,
            isCorrect: {
              type: Boolean,
              default: false
            }
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
);

const Quiz = model("quiz", quizSchema);
export default Quiz;
