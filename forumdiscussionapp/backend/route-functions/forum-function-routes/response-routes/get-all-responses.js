import { sequelize } from "../../../db.js";

export const getAllResponses = async (req, res) => {
  const { commentId } = req.params;

  try {
    const Responses = sequelize.models.Responses;
    const CommonAttributes = sequelize.models.CommonAttributes;

    const responses = await Responses.findAll({
      where: { CommentID: commentId },
      include: [
        {
          model: CommonAttributes,
          attributes: [],
          where: { IsDeleted: false },
        },
      ],
    });

    res.json({ responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
