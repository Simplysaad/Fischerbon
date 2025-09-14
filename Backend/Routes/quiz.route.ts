import { Router } from "express";
const quizRouter = Router();

import { createQuiz, getQuiz } from "../Controllers/quiz.controller";
import Quiz from "../Models/quiz.model";

quizRouter.post("/:lessonId", createQuiz);
quizRouter.get("/:quizId", getQuiz);

export default quizeRouter;
