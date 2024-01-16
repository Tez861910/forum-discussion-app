import { sequelize } from "../../../db.js";

export const handleGroupMessagesGetBySenderId = async (req, res) => {
  const { senderId } = req.params;

  try {
    // Dynamically access the GroupMessages model using sequelize.models
    const GroupMessages = sequelize.models.GroupMessages;

    const result = await GroupMessages.findAll({
      where: { SenderID: senderId },
    });

    console.log("Group messages retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting group messages:", error);
    res
      .status(500)
      .json({ error: "Error getting group messages", details: error.message });
  }
};
