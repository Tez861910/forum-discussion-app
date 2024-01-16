import { sequelize } from "../../../db.js";

export const handleExamCreate = async (req, res) => {
  const {
    examName,
    examStatus,
    examDuration,
    instructions,
    courseId,
    createdByUserId,
  } = req.body;

  const Exams = sequelize.models.Exams;

  try {
    const result = await Exams.create({
      ExamName: examName,
      ExamStatus: examStatus,
      ExamDuration: examDuration,
      Instructions: instructions,
      CourseID: courseId,
      CreatedByUserID: createdByUserId,
    });

    if (result) {
      console.log("Exam created successfully");
      res.json({ message: "Exam created successfully" });
    } else {
      console.error("Exam creation failed");
      res.status(500).json({ error: "Exam creation failed" });
    }
  } catch (error) {
    console.error("Error creating exam:", error);
    res
      .status(500)
      .json({ error: "Exam creation failed", details: error.message });
  }
};
