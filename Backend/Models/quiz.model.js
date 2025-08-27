import { Schema, model } from "mongoose";

const quizSchema = Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course"
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
