import { query } from "../../../db.js";

export const handleQuestionDeleteById = async (req, res) => {
  const { questionId } = req.params;

  try {
    const sql = "DELETE FROM Question WHERE QuestionID = ?";
    const [result] = await query(sql, [questionId]);

    if (result.affectedRows === 1) {
      console.log("Question deleted successfully");
      res.json({ message: "Question deleted successfully" });
    } else {
      console.error("Question deletion failed");
      res.status(500).json({ error: "Question deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting question:", error);
    res
      .status(500)
      .json({ error: "Error deleting question", details: error.message });
  }
};
