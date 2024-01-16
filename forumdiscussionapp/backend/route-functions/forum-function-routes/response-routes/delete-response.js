import { sequelize } from "../../../db.js";

export const deleteResponse = async (req, res) => {
  const { responseId } = req.params;

  try {
    const Responses = sequelize.models.Responses;

    const result = await Responses.destroy({
      where: { ResponseID: responseId },
    });

    if (result === 1) {
      console.log("Response deleted successfully");
      res.json({ message: "Response deleted successfully" });
    } else {
      console.error("Response deletion failed");
      res.status(500).json({ error: "Response deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
