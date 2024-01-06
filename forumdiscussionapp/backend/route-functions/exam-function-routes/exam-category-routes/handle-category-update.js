import { query } from "../../../db.js";

export const handleCategoryUpdate = async (req, res) => {
  const { categoryId } = req.params;
  const { categoryName } = req.body;

  try {
    const sql = "UPDATE ExamCategory SET CategoryName = ? WHERE CategoryID = ?";
    const [result] = await query(sql, [categoryName, categoryId]);

    if (result.affectedRows === 1) {
      console.log("Exam category updated successfully");
      res.json({ message: "Exam category updated successfully" });
    } else {
      console.error("Exam category update failed");
      res.status(500).json({ error: "Exam category update failed" });
    }
  } catch (error) {
    console.error("Error updating exam category:", error);
    res
      .status(500)
      .json({ error: "Exam category update failed", details: error.message });
  }
};
