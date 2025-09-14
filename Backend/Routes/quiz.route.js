import { Router } from "express";
const quizRouter = Router();

import { getQuiz } from "../Controllers/quiz.controller";

quizRouter.get("/:quizId", getQuiz);

export default quizeRouter;
