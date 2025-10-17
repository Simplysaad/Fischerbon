import Course from "../Models/course.model.js";
import User from "../Models/user.model.js";
import Lesson from "../Models/lesson.model.js";
import Enrollment from "../Models/enrollment.model.js";
import mongoose from "mongoose";

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
      message: `${courses.length} courses successfully retrieved`,
      data: courses,
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
        message: "Bad request - Nothing is being sent",
      });
    }

    const { _id: userId } = req.user;

    const currentUser = await User.findOne({ _id: userId });
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id ",
      });
    }

    const isAuthorized =
      currentUser.role === "instructor" || currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized - only instructor or admin can access this route",
      });
    }

    // const { title, description, price, category, tags, level } = req.body;
    console.log(req.file, req.files, req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail is required for course creation",
      });
    }
    const thumbnailUrl = req.file?.path;
    const newCourse = new Course({
      ...req.body,
      thumbnailUrl,
      instructorId: currentUser?._id,
    });

    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: "new course created",
      data: newCourse,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad Request - Nothing is being sent",
      });
    }
    console.log(req.body);

    const { courseId } = req.params;
    const { title, description, price, category, level, tags } = req.body;

    let thumbnailUrl = req.file?.path;

    const update = {};

    if (title || description || price || category || level) {
      update.$set = {};

      if (title) update.$set.title = title;
      if (description) update.$set.description = description;
      if (price) update.$set.price = price;
      if (category) update.$set.category = category;
      if (level) update.$set.level = level;
      if (thumbnailUrl) update.$set.thumbnailUrl = thumbnailUrl;
    }

    if (tags) {
      update.$addToSet = { $each: tags };
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, update, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "course could not be found ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "course updated successfully",
      data: updatedCourse,
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
        message: "Bad request - Nothing is being sent",
      });
    }

    const { userId } = req;
    const currentUser = await User.findOne({ _id: userId });

    const isAuthorized =
      currentUser.role === "instructor" || currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized - only instructor or admin can access this route",
      });
    }

    const { courseId } = req.params;
    const { title, text } = req.body;

    if (!text && !req.files) {
      return res.status(400).json({
        success: false,
        message: "neither text nor file is uploaded",
      });
    }

    const content = {};

    if (text) {
      content.text = text;
    }

    if (req.files) {
      console.log(req.files);
      const { lessonVideo, lessonFiles } = req.files;

      console.log(lessonFiles);
      const lessonFilesPaths = lessonFiles
        ? Array.isArray(lessonFiles)
          ? lessonFiles?.map((file) => file.path)
          : lessonFiles[0]?.path
        : null;
      console.log("lessonFilesPaths", lessonFilesPaths);

      const lessonVideoPath = lessonVideo ? lessonVideo[0]?.path : null;
      console.log("lessonVideoPath", lessonVideoPath);

      content.video = lessonVideoPath;
      content.files = lessonFilesPaths;
    }

    const newLesson = new Lesson({
      courseId,
      title,
      content,
    });

    await newLesson.save();

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: { lessons: newLesson._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "new lesson added successfully",
      data: newLesson,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;
    const { userId } = req;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id",
      });
    }

    const currentCourse = await Course.findById(courseId);
    if (!currentCourse) {
      return res.status(400).json({
        success: false,
        message: "Invalid course Id",
      });
    }

    const isAuthorized =
      currentCourse.instructorId.toString() === userId ||
      currentUser.role === "admin";

    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only owner or admin can delete lesson",
      });
    }

    // Check if lesson exists before deleting
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // Update course lessons array
    currentCourse.lessons = currentCourse.lessons.filter(
      (lesson) => lesson.toString() !== lessonId
    );
    await currentCourse.save();

    return res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
      data: currentCourse,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { userId } = req;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id",
      });
    }

    const currentCourse = await Course.findById(courseId);
    if (!currentCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const isAuthorized =
      currentCourse.instructorId.toString() === userId ||
      currentUser.role === "admin";

    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only owner or admin can delete course",
      });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course already deleted or not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (err) {
    next(err);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const { userId } = req;
    const { courseId } = req.params;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Uncomment and implement enrollment and instructor checks before sending course data
    /*
    const isInstructor = await Course.exists({ _id: courseId, instructorId: userId });
    const isEnrolled = await Enrollment.exists({ userId, courseId });

    if (!isInstructor && !isEnrolled && currentUser.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied - not enrolled or instructor",
      });
    }
    */

    const currentCourse = await Course.findById(courseId).populate("lessons");
    if (!currentCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course data retrieved successfully",
      data: currentCourse,
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

    // const currentEnrollment = await Enrollment.findOne({
    //   $and: [{ courseId }, { userId }]
    // });

    // if (!currentEnrollment) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Forbidden - User not enrolled to this course"
    //   });
    // }

    const currentLesson = await Lesson.findOne({ _id: lessonId });
    if (!currentLesson) {
      return res.status(404).json({
        success: false,
        message: "Invalid Lesson Id",
      });
    }

    if (completed) {
      const completedLesson = {
        lessonId: new mongoose.Types.ObjectId(lessonId),
        completedAt: new Date(Date.now()),
      };

      // await currentEnrollment.save();

      return res.status(201).json({
        success: true,
        message: "Lesson completed - progress saved",
        data: completedLesson,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lesson retrieved successfully",
      data: currentLesson,
    });
  } catch (err) {
    next(err);
  }
};
