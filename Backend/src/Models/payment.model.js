import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course"
    },
    amount: {
      type: Number,
      required: true
    },
    access_code: String,
    transactionId: {
      type: Number,
      required: true,
      unique: true
    },
    reference: {
      type: String,
      unique: true,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "abandoned"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Payment = model("payment", paymentSchema);
export default Payment;
