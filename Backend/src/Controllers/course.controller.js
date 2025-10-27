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

    const parsedPage = Number.parseInt(page, 10);
    const parsedLimit = Number.parseInt(limit, 10);
    const pageNum =
      Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const pageSize =
      Number.isFinite(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 100)
        : 20;

    const courses = await Course.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
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

    const currentUser = req.user;

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid user Id ",
      });
    }

    const isAuthorized = currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only admin can access this route",
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
      instructor: currentUser?._id,
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

export const updateLesson = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - Nothing is being sent",
      });
    }

    const currentUser = req.user;

    const isAuthorized = currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only admin can access this route",
      });
    }

    const { courseId, lessonId } = req.params;
    const { title, text } = req.body;

    if (!text && !req.files) {
      return res.status(400).json({
        success: false,
        message: "neither text nor file is uploaded",
      });
    }

    const updates = {};
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
    if (title || content) updates.$set = {};
    if (title) updates.$set.title = title;
    if (content) {
      if (content.text) updates.$set["content.text"] = content.text;
      if (content.video) updates.$set["content.text"] = content.video;
      // if(content.files) updates.$push["content.files"] = content.files; // TODO: use $each operator
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, updates, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "lesson updated successfully",
      data: updatedLesson,
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

    const currentUser = req.user;

    const isAuthorized = currentUser.role === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - only admin can access this route",
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

    const currentUser = req.user;
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
      currentCourse.instructor.toString() === currentUser._id ||
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

    const currentUser = req.user;
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
      currentCourse.instructor.toString() === currentUser._id ||
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
    const { courseId } = req.params;

    const currentCourse = await Course.findById(courseId).populate({
      path: ["instructor", "lessons"],
    });
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
    const { _id: userId } = req.user;

    const currentLesson = await Lesson.findOne({ _id: lessonId });
    if (!currentLesson) {
      return res.status(404).json({
        success: false,
        message: "Invalid Lesson Id",
      });
    }
    const currentEnrollment = await Enrollment.findOneAndUpdate({
      $and: [{ courseId }, { userId }],
    });

    if (completed) {
      const completedLesson = {
        lessonId,
        completedAt: new Date(Date.now()),
      };

      const isAlreadyCompleted = currentEnrollment.completedLessons.find(
        (cl) => cl.lessonId.toString() === lessonId
      );

      if (!isAlreadyCompleted) {
        currentEnrollment.completedLessons.push(completedLesson);
        await currentEnrollment.save();
      }

      return res.status(200).json({
        success: true,
        message: "Lesson completed - progress saved",
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
