import { Schema, model, Document } from "mongoose";

interface ILesson {
  courseId: Schema.Types.ObjectId;

  title: string;
  content: {
    text: string;
    video: string;
    files: string[];
  };
  quizId: Schema.Types.ObjectId;
}

const lessonSchema = new Schema<ILesson>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course"
  },
  title: String,
  content: {
    text: String,
    video: String,
    files: [String]
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "quiz"
  }
});

const Lesson = model<ILesson>("lesson", lessonSchema);
export default Lesson;
