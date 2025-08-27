import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
  title: String,
  content: {
    text: String,
    videoUrl: String,
    fileUploads: [String]
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "quiz"
  }
});

const Lesson = model("lesson", lessonSchema);
export default Lesson;
