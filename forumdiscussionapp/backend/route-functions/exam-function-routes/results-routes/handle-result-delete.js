import { sequelize } from "../../../db.js";

export const handleResultDelete = async (req, res) => {
  const { resultId } = req.params;

  try {
    const Results = sequelize.models.Results;
    const result = await Results.destroy({
      where: { ResultID: resultId },
    });

    if (result === 1) {
      console.log("Exam result deleted successfully");
      res.json({ message: "Exam result deleted successfully" });
    } else {
      console.error("Exam result deletion failed");
      res.status(500).json({ error: "Exam result deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting exam result:", error);
    res
      .status(500)
      .json({ error: "Exam result deletion failed", details: error.message });
  }
};
