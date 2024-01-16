import { sequelize } from "../../../db.js";

export const updateResponse = async (req, res) => {
  const { responseId } = req.params;
  const { content } = req.body;

  try {
    const Responses = sequelize.models.Responses;

    const result = await Responses.update(
      { ResponseContent: content },
      { where: { ResponseID: responseId } }
    );

    if (result[0] === 1) {
      console.log("Response updated successfully");
      res.json({ message: "Response updated successfully" });
    } else {
      console.error("Response update failed");
      res.status(500).json({ error: "Response update failed" });
    }
  } catch (error) {
    console.error("Error updating response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
