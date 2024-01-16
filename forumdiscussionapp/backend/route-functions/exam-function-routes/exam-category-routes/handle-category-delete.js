import { sequelize } from "../../../db.js";

export const handleCategoryDelete = async (req, res) => {
  const { categoryId } = req.params;

  const ExamCategorys = sequelize.models.ExamCategorys;

  try {
    const result = await ExamCategorys.destroy({
      where: {
        CategoryID: categoryId,
      },
    });

    if (result === 1) {
      console.log("Exam category deleted successfully");
      res.json({ message: "Exam category deleted successfully" });
    } else {
      console.error("Exam category deletion failed");
      res.status(500).json({ error: "Exam category deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting exam category:", error);
    res
      .status(500)
      .json({ error: "Exam category deletion failed", details: error.message });
  }
};
