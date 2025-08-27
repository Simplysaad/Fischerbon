import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.Objectid,
      ref: "user"
    },
    courseId: {
      type: Schema.Types.Objectid,
      ref: "course"
    },
    method: {
      type: String,
      enum: ["debit_card", "bank_transfer"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currrency: {
      type: String,
      enum: ["pending", "completed", "failed", "abandoned", "refunded"],
      default: "pending"
    },
    transactionId: {
      type: String,
      unique: true,
      required: true
    },
    paymentDate: Date
  },
  {
    timestamps: true
  }
);

const Payment = model("payment", paymentSchema);
export default Payment;
