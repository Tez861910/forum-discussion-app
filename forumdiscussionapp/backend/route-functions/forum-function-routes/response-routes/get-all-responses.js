import { sequelize } from "../../../db.js";

export const getAllResponses = async (req, res) => {
  const { commentId } = req.params;

  try {
    const Responses = sequelize.models.Responses;

    const responses = await Responses.findAll({
      where: { CommentID: commentId },
    });

    res.json({ responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
