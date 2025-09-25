import { uploadMultipleToCloud, uploadToCloud } from "../Config/cloudinary.js";

import Course from "../Models/course.model.js";
import User from "../Models/user.model.js";
import Lesson from "../Models/lesson.model.js";
import Enrollment from "../Models/enrollment.model.js";

export const getCourses = async (req, res, next) => {
  try {
    const { page, limit, max_price, min_price, category, level } = req.query;

    const filter = {};

    if (max_price || min_price) {
      filter.price = {};
      if (max_price) filter.price.$lte = parseFloat(max_price);
      if (min_price) filter.price.$gte = parseFloat(min_price);
    }

    if (category) filter.category = category;
    if (level) filter.level = level;

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .skip(page ? Number((parseInt(page) - 1) * parseInt(limit)) : 0)
      .limit(parseInt(limit) ?? null);

    return res.status(200).json({
      success: true,
      message: "courses successfully retrieved",
      data: courses
    });
  } catch (err) {
    next(err);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - Nothing is being sent"
      });
    }

    const { userId } = req;
    // console.log(userId);

    const currentUser = await User.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id "
      });
    }

    const isAuthorized =
      currentUser.role === "instructor" || currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only instructor or admin can access this route"
      });
    }

    // const { title, description, price, category, tags, level } = req.body;

    if (!req.file)
      throw new Error("thumbnail is not uploaded ", { cause: "no req.file" });

    const { path: thumbnailUrl } = req.file;

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

    const { userId } = req;
    const currentUser = await User.findOne({ _id: userId });

    const isAuthorized =
      currentUser.role === "instructor" || currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only instructor or admin can access this route"
      });
    }

    const { courseId } = req.params;
    const { title, text } = req.body;

    if (!text && !req.files) {
      return res.status(400).json({
        success: false,
        message: "neither text nor file is uploaded"
      });
    }

    const content = {};

    if (text) {
      content.text = text;
    }

    if (req.files) {
      console.log(files);

      const { lessonVideo, lessonFiles } = req.files;

      const lessonFilesPaths = lessonFiles.map((file) => file.path);
      console.log("lessonFilesPaths", lessonFilesPaths);

      const lessonVideoPath = lessonVideo[0].path;
      console.log("lessonVideoPath", lessonVideoPath);

      (content.video = lessonVideoPath), (content.files = lessonFilesPaths);
    }

    const newLesson = new Lesson({
      courseId,
      title,
      content: {
        text
      }
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
      data: newLesson
    });
  } catch (err) {
    next(err);
  }
};

export const getLessons = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const currentCourse = await Course.findOne({ _id: courseId })
      .populate("lessons")
      .select("_id title description lessons");

    return res.status(200).json({
      success: true,
      message: `${currentCourse?.lessons?.length ?? 0} lesson retrieved`,
      data: currentCourse
    });
  } catch (err) {
    next(err);
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;
    const { userId } = req;

    const currentUser = await User.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id "
      });
    }

    const currentCourse = await Course.findOne({ _id: courseId });
    if (!currentCourse) {
      return res.status(400).json({
        success: false,
        message: "Invalid course Id "
      });
    }

    const isAuthorized =
      currentCourse.instructorId.toString() === userId ||
      currentUser.role === "admin";

    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only owner or admin can delete lesson"
      });
    }

    await Lesson.findByIdAndDelete(lessonId);

    currentCourse.lessons.filter((lesson) => lesson.toString() !== lessonId);
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
    const { userId } = req;

    const currentUser = await User.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id "
      });
    }

    const currentCourse = await Course.findOne({ _id: courseId });
    if (!currentCourse) {
      return res.status(400).json({
        success: false,
        message: "Invalid course Id "
      });
    }

    const isAuthorized =
      currentCourse.instructorId.toString() === userId ||
      currentUser.role === "admin";

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

export const getCourse = async (req, res, next) => {
  try {
    const { userId } = req;
    const { courseId } = req.params;

    const currentUser = await User.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id - user not logged in "
      });
    }

    // Check if user is enrolled or is instructor or is admin
    const isInstructor = await Course.findOne({
      $and: [{ instructorId: userId }, { courseId }]
    });

    const currentEnrollment = await Enrollment.findOne({
      $and: [{ userId }, { courseId }]
    })
      .populate("courseId")
      .populate("courseId.lessons");

    console.log("currentEnrollement", currentEnrollment);
    console.log("isInstructor", isInstructor);

    if (!currentEnrollment) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not enrolled for this course"
      });
    }

    if (isInstructor) {
      const currentCourse = await Course.findOne({ _id: courseId });
      return res.status(200).json({
        success: true,
        message: "Course data retrieved successfully",
        data: currentCourse
      });
    }

    return res.status(200).json({
      success: true,
      message: "course retrieved successfully",
      data: currentEnrollment
    });
  } catch (err) {
    next(err);
  }
};

export const getLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;
    const { completed } = req.query;
    const { userId } = req;

    const currentEnrollment = await Enrollment.findOne({
      $and: [{ courseId }, { userId }]
    });

    if (!currentEnrollment) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - User not enrolled to this course"
      });
    }

    const currentLesson = await Lesson.findOne({ _id: lessonId });
    if (!currentLesson) {
      return res.status(404).json({
        success: false,
        message: "Invalid Lesson Id"
      });
    }

    if (completed) {
      const completedLesson = {
        lessonId: new Schema.Types.ObjectId(lessonId),
        completedAt: new Date(Date.now())
      };

      currentEnrollment.completedLessons.push(completedLesson);
      await currentEnrollment.save();

      return res.status(201).json({
        success: true,
        message: "Lesson completed - progress saved "
        // data: currentLesson
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lesson retrieved successfully",
      data: currentLesson
    });
  } catch (err) {
    next(err);
  }
};
