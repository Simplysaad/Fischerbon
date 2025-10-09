import { Router } from "express";
import Waitlist from "../Models/waitlist.model.js";
import authMiddleware from "../Middleware/auth.middleware.js";

const waitlistRouter = Router();

waitlistRouter.post("/", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing",
      });
    }

    const { email, recieveUpdates } = req.body;
    const newEntry = await Waitlist.findOneAndUpdate(
      { email },
      {
        $setOnInsert: { email, recieveUpdates },
        $inc: { timesJoined: 1 },
      },
      { upsert: true, new: true }
    );

    if (!newEntry) {
      return res.status(500).json({
        success: false,
        message: "Failed to add user to waitlist",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User added to waitlist",
      data: newEntry,
    });
  } catch (err) {
    next(err);
  }
});

waitlistRouter.get("/", authMiddleware, async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser || currentUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    const entries = await Waitlist.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: `${entries.length} waitlist entries found`,
      data: entries,
    });
  } catch (err) {
    next(err);
  }
});
export default waitlistRouter;
