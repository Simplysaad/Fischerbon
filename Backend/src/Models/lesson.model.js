import { Schema, model } from "mongoose";

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

lessonSchema.virtual("slug").get(function () {
  if (!this.title) {
    return `${this._id}`;
  }
  const normalized = this.title
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return `${normalized}-${this._id}`;
});

lessonSchema.set("toJSON", { virtuals: true });
lessonSchema.set("toObject", { virtuals: true });
const Lesson = model("lesson", lessonSchema);
export default Lesson;
