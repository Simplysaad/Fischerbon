import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
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

const Lesson = model("lesson", lessonSchema);
export default Lesson;
