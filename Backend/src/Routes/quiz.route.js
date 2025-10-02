import { Router } from "express";
const quizRouter = Router();

import { createQuiz, getQuiz } from "../Controllers/quiz.controller.js";
import Quiz from "../Models/quiz.model.js";

quizRouter.post("/:lessonId", createQuiz);
quizRouter.get("/:quizId", getQuiz);

export default quizRouter;
