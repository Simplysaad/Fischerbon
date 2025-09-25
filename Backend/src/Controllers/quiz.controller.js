import Quiz from "../Models/quiz.model";
import Enrollment from "../Models/enrollment.model";
import Lesson from "../Models/lesson.model";
import mongoose from "mongoose";

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

    const hasCompletedLesson = completedLessons.find(
      (lesson) => lesson.lessonId.toString() === currentQuiz.lessonId.toString()
    );

    if (!hasCompletedLesson) {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden - User has not completed the lesson, hence cannot take quiz"
      });
    }

    if (completed) {
      currentEnrollment.quizResults.push({
        quizId: new mongoose.Types.ObjectId(quizId),
        score: parseInt(score.toLocaleString()),
        attemptedAt: new Date(Date.now())
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

    const newQuiz = new Quiz({
      // courseId,
      title,
      questions
    });

    const currentLesson = await Lesson.findOneAndUpdate(
      { _id: lessonId },
      { $set: { quizId: newQuiz._id } },
      { new: true }
    );

    newQuiz.courseId = currentLesson.courseId;

    await newQuiz.save();

    return res.status(201).json({
      success: true,
      message: "New quiz created",
      data: currentLesson
    });
  } catch (err) {
    next(err);
  }
};
