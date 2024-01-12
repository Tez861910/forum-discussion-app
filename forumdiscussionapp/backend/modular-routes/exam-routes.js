import express from "express";

import examsRoutes from "../routes/exam-routes/exams.js";
import questiontypesRoutes from "../routes/exam-routes/question-types.js";
import questionsRoutes from "../routes/exam-routes/questions.js";
import mcqoptionsRoutes from "../routes/exam-routes/mcq-options.js";
import answersRoutes from "../routes/exam-routes/answers.js";
import userresponsesRoutes from "../routes/exam-routes/user-responses.js";
import examcategoriesRoutes from "../routes/exam-routes/exam-category.js";
import examshcedulesRoutes from "../routes/exam-routes/exam-shedule.js";
import resultsRoutes from "../routes/exam-routes/results.js";
import examattemptsRoutes from "../routes/exam-routes/exam-attempts.js";

const router = express.Router();

router.use("/exams", examsRoutes);
router.use("/questiontypes", questiontypesRoutes);
router.use("/questions", questionsRoutes);
router.use("/mcqoptions", mcqoptionsRoutes);
router.use("/answers", answersRoutes);
router.use("/userresponses", userresponsesRoutes);
router.use("/examcategories", examcategoriesRoutes);
router.use("/examschedules", examshcedulesRoutes);
router.use("/results", resultsRoutes);
router.use("/examattempts", examattemptsRoutes);

export default router;
