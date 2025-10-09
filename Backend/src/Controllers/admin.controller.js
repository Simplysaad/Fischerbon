import Course from "../Models/course.model.js";
import Enrollment from "../Models/enrollment.model.js";

export const getDashboardInfo = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const courses = await Course.find({ instructorId: currentUser._id });
    const enrollments = await Enrollment.find({
      courseId: { $in: courses.map((course) => course._id) },
    })
      .populate({
        path: ["courseId", "userId"],
      })
      .sort({ createdAt: -1 });


    const enrollmentsArray = enrollments.map((enrollment) => {
      return {
        progress:
          (enrollment.completedLessons.length /
            enrollment.courseId.lessons.length) *
            100 || "not started",
        status: enrollment.status,
        name: enrollment.userId.name,
        id: enrollment._id,
      };
    });

    const coursesArray = courses.map((course) => ({
      id: course._id,
      title: course.title,
      description: course.description,
      enrollments: enrollments.filter(
        (enrollment) =>
          enrollment.courseId._id.toString() === course._id.toString()
      ).length,
      price: course.price,
      completionRate:
        (enrollments.filter(
          (enrollment) =>
            enrollment.courseId._id.toString() === course._id.toString() &&
            enrollment.status === "completed"
        ).length *
          100) /
        enrollments.filter(
          (enrollment) =>
            enrollment.courseId._id.toString() === course._id.toString()
        ).length,
      thumbnailUrl: course.thumbnailUrl,
      createdAt: course.createdAt,
    }));

    const stats = [
      {
        id: 1,
        icon: "Users",
        label: "Enrolled Learners",
        value: enrollments.length,
      },
      {
        id: 2,
        icon: "ClipboardCheck",
        label: "Course Completion Rate",
        value: `${
          (enrollments.filter((enrollment) => enrollment.status === "completed")
            .length *
            100) /
          enrollments.length
        }%`,
      },
      {
        id: 3,
        icon: "BookOpen",
        label: "Courses Available",
        value: courses.length,
      },
      { id: 4, icon: "Bell", label: "New Notifications", value: 70 },
    ];

    const response = {
      name: currentUser.name,
      emailAddress: currentUser.email,
      courses: coursesArray,
      enrollments: enrollmentsArray,
      stats,
      role: currentUser.role,
    };

    return res.status(200).json({
      success: true,
      message: "Dashboard info fetched successfully",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const courses = await Course.find({ instructorId: currentUser._id });
    console.log(courses);
    const enrollments = await Enrollment.find({
      courseId: { $in: courses.map((course) => course._id) },
    });

    const coursesArray = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      description: course.description,
      enrollments: enrollments.filter(
        (enrollment) => enrollment.courseId.toString() === course._id.toString()
      ).length,
      thumbnailUrl: course.thumbnailUrl,
    }));

    return res.status(200).json({
      success: true,
      message: `${coursesArray.length} courses fetched successfully`,
      data: coursesArray,
    });
  } catch (err) {
    next(err);
  }
};
