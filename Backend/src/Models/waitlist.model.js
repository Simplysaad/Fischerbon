import { model, Schema } from "mongoose";

const waitlistSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    // name: { type: String, required: true },
    timesJoined: { type: Number, default: 1 },
    recieveUpdates: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Waitlist = model("Waitlist", waitlistSchema);
export default Waitlist;
