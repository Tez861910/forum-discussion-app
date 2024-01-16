import { sequelize } from "../../../db.js";

export const createResponse = async (req, res) => {
  const { commentId } = req.params;
  const { content, userId } = req.body;

  try {
    const Responses = sequelize.models.Responses;

    await Responses.create({
      ResponseContent: content,
      UserID: userId,
      CommentID: commentId,
    });

    res.json({ message: "Response added successfully" });
  } catch (error) {
    console.error("Error adding response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
