import { Schema, model, Document, Types } from "mongoose";

interface IQuiz extends Document {
  courseId: Types.ObjectId;
  lessonId: Types.ObjectId;
  title: string;
  questions: IQuestion[];
}

interface IQuestion {
  text: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

const quizSchema = new Schema<IQuiz>(
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

const Quiz = model<IQuiz>("quiz", quizSchema);
export default Quiz;
