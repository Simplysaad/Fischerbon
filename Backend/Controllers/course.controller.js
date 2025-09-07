import { uploadMultipleToCloud, uploadToCloud } from "../Config/cloudinary.js";

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
    let thumbnailUrl;
    if (!req.file) {
      thumbnailUrl = "";
    } else {
      let upload = await uploadToCloud(req.file?.path);
      thumbnailUrl = upload?.secure_url;
    }

    const newCourse = new Course({
      ...req.body,
      thumbnailUrl,
      instructorId: currentUser?._id
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

    // const currentUser = await User.findOne({ _id: req.userId });

    // const isAuthorized = true;
    // currentUser.role === "instructor" || currentUser.role === "admin";
    // if (!isAuthorized) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized - only instructor or admin can access this route"
    //   });
    // }

    const { courseId } = req.params;
    const { title, text } = req.body;
    const { lessonFiles, lessonVideo } = req.files;

    const lessonFilesPaths = lessonFiles.map((file) => file.path);
    // console.log("lessonFilesPaths", lessonFilesPaths);

    const lessonFilesUploads = await uploadMultipleToCloud(
      lessonFilesPaths,
      "raw"
    );
    // console.log("lessonFilesUploads", lessonFilesUploads);

    const lessonVideoPath = lessonVideo[0].path;
    // console.log("lessonVideoPath", lessonVideoPath);

    const lessonVideoUpload = await uploadToCloud(lessonVideoPath);
    // console.log("lessonVideoUploads", lessonVideoUploads);

    const newLesson = new Lesson({
      courseId,
      title,
      content: {
        text,
        video: lessonVideoUpload,
        files: lessonFilesUploads
      }
    });

    await newLesson.save();

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: { lessons: newLesson._id }
      },
      { new: true }
    ).populate("lessons");

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

    const isAuthorized = true;
    // currentCourse.instructorId === req.userId || currentUser.role === "admin";

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
