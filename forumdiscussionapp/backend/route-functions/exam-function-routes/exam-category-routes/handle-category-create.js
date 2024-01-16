import { sequelize } from "../../../db.js";

export const handleCategoryCreate = async (req, res) => {
  const { categoryName } = req.body;

  const ExamCategorys = sequelize.models.ExamCategorys;

  try {
    const result = await ExamCategorys.create({
      CategoryName: categoryName,
    });

    if (result) {
      console.log("Exam category created successfully");
      res.json({ message: "Exam category created successfully" });
    } else {
      console.error("Exam category creation failed");
      res.status(500).json({ error: "Exam category creation failed" });
    }
  } catch (error) {
    console.error("Error creating exam category:", error);
    res
      .status(500)
      .json({ error: "Exam category creation failed", details: error.message });
  }
};
