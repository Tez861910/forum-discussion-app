import { sequelize } from "../../../db.js";
import { Op } from "sequelize";

export const handlePrivateMessagesGetByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Dynamically access the PrivateMessages model using sequelize.models
    const PrivateMessages = sequelize.models.PrivateMessages;

    const result = await PrivateMessages.findAll({
      where: {
        [Op.or]: [{ SenderID: userId }, { ReceiverID: userId }],
      },
    });

    console.log("Private messages retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting private messages:", error);
    res.status(500).json({
      error: "Error getting private messages",
      details: error.message,
    });
  }
};
