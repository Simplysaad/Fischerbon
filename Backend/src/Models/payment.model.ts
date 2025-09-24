import { Document, Schema, model } from "mongoose";

interface IPayment extends Document {
  userId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  amount: number;
  access_code: string;
  transactionId: number;
  reference: string;
  status: "pending" | "success" | "failed" | "abandoned";
}

const paymentSchema = new Schema<IPayment>(
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

const Payment = model<IPayment>("payment", paymentSchema);
export default Payment;
