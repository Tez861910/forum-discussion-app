import { query } from "../../../db.js";

export const handleMCQOptionDeleteById = async (req, res) => {
  const { mcqOptionId } = req.params;

  try {
    const sql = "DELETE FROM MCQOptions WHERE MCQOptionID = ?";
    const [result] = await query(sql, [mcqOptionId]);

    if (result.affectedRows === 1) {
      console.log("MCQ option deleted successfully");
      res.json({ message: "MCQ option deleted successfully" });
    } else {
      console.error("MCQ option deletion failed");
      res.status(500).json({ error: "MCQ option deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting MCQ option:", error);
    res
      .status(500)
      .json({ error: "Error deleting MCQ option", details: error.message });
  }
};
