import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: String,
    description: String,
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    price: Number,
    payment: {
      type: String,
      enum: ["paid", "free"],
      default: "paid",
    },

    category: String,
    tags: [String],
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    thumbnailUrl: String,
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: "lesson",
      },
    ],
    ratings: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        rating: Number,
        message: String,
      },
    ],
  },
  { timestamps: true }
);

courseSchema.virtual("slug").get(function () {
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

courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });

const Course = model("course", courseSchema);
export default Course;
