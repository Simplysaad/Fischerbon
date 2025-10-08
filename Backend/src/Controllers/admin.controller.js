import Course from "../Models/course.model.js";
import Enrollment from "../Models/enrollment.model.js";

export const getDashboardInfo = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const courses = await Course.find({ instructorId: currentUser._id });
    console.log(courses);
    const enrollments = await Enrollment.find({
      courseId: { $in: courses.map((course) => course._id) },
    });

    const coursesArray = courses.map((course) => ({
      title: course.title,
      description: course.description,
      enrollments: enrollments.filter(
        (enrollment) => enrollment.courseId.toString() === course._id.toString()
      ).length,
      thumbnailUrl: course.thumbnailUrl,
    }));

    const stats = [
      {
        label: "Courses Created",
        value: courses.length,
      },
      {
        label: "Enrollments",
        value: enrollments.length,
      },
    ];

    const response = {
      name: currentUser.name,
      emailAddress: currentUser.email,
      courses: coursesArray,
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
