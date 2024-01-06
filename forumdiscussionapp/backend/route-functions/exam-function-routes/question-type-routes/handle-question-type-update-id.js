import { query } from "../../../db.js";

export const handleQuestionTypeUpdateById = async (req, res) => {
  const { questionTypeId } = req.params;
  const { questionTypeName } = req.body;

  try {
    const sql =
      "UPDATE QuestionType SET QuestionTypeName = ? WHERE QuestionTypeID = ?";
    const [result] = await query(sql, [questionTypeName, questionTypeId]);

    if (result.affectedRows === 1) {
      console.log("Question type updated successfully");
      res.json({ message: "Question type updated successfully" });
    } else {
      console.error("Question type update failed");
      res.status(500).json({ error: "Question type update failed" });
    }
  } catch (error) {
    console.error("Error updating question type:", error);
    res
      .status(500)
      .json({ error: "Question type update failed", details: error.message });
  }
};
