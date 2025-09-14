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

    // check if currentquiz.lessonId is in completd lessons

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
