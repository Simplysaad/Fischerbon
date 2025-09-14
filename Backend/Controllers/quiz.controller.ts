import Quiz from "../Models/quiz.model";
import Enrollment from "../Models/enrollment.model";

export const getQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { userId } = req;
    const { completed, score } = req.query;

    const currentQuiz = await Quiz.findOne({ _id: quizId });

    const currentEnrollment = await Enrollment.findOne({
      $and: [{ userId }, { courseId: currentQuiz.courseId }]
    });

    if (!currentEnrollment) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - User is not enrolled to this course"
      });
    }


    const { completedLessons } = currentEnrollment;

    const hasCompletedLesson = completedLessons.includes(currentQuiz.lessonId);
    if (!hasCompletedLesson) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden - User has not completed the lesson, hence cannot take quiz"
      });
    }

    if (completed) {
      currentEnrollment.quizResults.push({
        quizId,
        score,
        attemptedAt: Date.now()
      });

      await currentEnrollment.save();

      return res.status(201).json({
        success: true,
        message: "quiz completed - progress saved "
      });
    }

    return res.status(200).json({
      success: true,
      message: "quiz retrieved successfully",
      data: currentQuiz
    });
  } catch (err) {
    next(err);
  }
};

export const createQuiz = async (req, res, next) => {
  try {
    const { title, questions, lessonId } = req.body;
    // const { lessonId } = req.params;

    const currentLesson = await Lesson.findOne({ _id: lessonId }).select(
      "_id courseId "
    );

    const { courseId } = currentLesson;

    const newQuiz = new Quiz({
      courseId,
      title,
      questions
    });

    await newQuiz.save();

    currentLesson.quizId = newQuiz._id;
    await currentLesson.save();

    return res.status(201).json({
      success: true,
      message: "New quiz created",
      data: currentLesson
    });
  } catch (err) {
    next(err);
  }
};
