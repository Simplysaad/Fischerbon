import path from "path";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

import Course from "../Models/course.model.js";
import User from "../Models/user.model.js";
import Lesson from "../Models/lesson.model.js";

export const createCourse = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - Nothing is being sent"
      });
    }

    const currentUser = await User.findOne({ _id: req.userId });

    const isAuthorized = true;
    // currentUser.role === "instructor" || currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only instructor or admin can access this route"
      });
    }

    // const { title, description, price, category, tags, level } = req.body;
    if (req.file) {
      const { thumbnail } = req.file;
      
      const thumbnailUpload = await cloudinary.uploader.upload(
        path.resolve(__dirname, thumbnail.path)
      );
      
      const { secure_url: thumbnailUrl } = thumbnailUpload;
    }

    console.log(req.body)

    const newCourse = new Course({
      ...req.body,
      // thumbnailUrl,
      // instructorId: currentUser._id
    });

    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: "new course created",
      data: newCourse
    });
  } catch (err) {
    next(err);
  }
};

export const createLesson = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - Nothing is being sent"
      });
    }

    const currentUser = await User.findOne({ _id: req.userId });

    const isAuthorized =
      currentUser.role === "instructor" || currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only instructor or admin can access this route"
      });
    }

    // let x = {
    //   title: String,
    //   content: {
    //     text: String,
    //     videoUrl: String,
    //     files: [String]
    //   },
    //   quizId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "quiz"
    //   }
    // };

    const { courseId } = req.params;
    const { lessonVideo, lessonFiles } = req.files;

    const lessonVideoUpload = await cloudinary.uploader.upload(
      path.resolve(__dirname, lessonVideo.path)
    );
    const { secure_url: videoUrl } = lessonVideoUpload;

    const lessonFilesUploadsPromises = [];

    lessonFiles.forEach((file) => {
      const filePromise = cloudinary.uploader.upload(
        path.resolve(__dirname, file.path)
      );

      lessonFilesUploadsPromises.push(filePromise);
    });

    const lessonFilesUploadsArray = await Promise.all(
      lessonFilesUploadsPromises
    );

    const lessonFilesUploads = lessonFilesUploadsArray.map(
      (upload) => upload.secure_url
    );

    const newLesson = new Lesson({
      ...req.body,
      videoUrl,
      files: lessonFilesUploads
    });

    await newLesson.save();

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: { lessons: newLesson._id }
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "new lesson added successfully",
      data: updatedCourse
    });
  } catch (err) {
    next(err);
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;

    const currentUser = await User.findOne({ _id: req.userId });
    const currentCourse = await Course.findOne({ _id: courseId });

    const isAuthorized =
      currentCourse.instructorId === req.userId || currentUser.role === "admin";

    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only owner or admin can delete lesson"
      });
    }

    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    currentCourse.lessons.filter((l) => l !== lessonId);
    const updatedCourse = await currentCourse.save();

    return res.status(201).json({
      success: true,
      message: "lesson deleted successfully",
      data: updatedCourse
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const currentUser = await User.findOne({ _id: req.userId });
    const currentCourse = await Course.findOne({ _id: courseId });

    const isAuthorized =
      currentCourse.instructorId === req.userId || currentUser.role === "admin";

    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only owner or admin can delete course"
      });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    return res.status(201).json({
      success: true,
      message: "course deleted successfully",
      data: deletedCourse
    });
  } catch (err) {
    next(err);
  }
};
