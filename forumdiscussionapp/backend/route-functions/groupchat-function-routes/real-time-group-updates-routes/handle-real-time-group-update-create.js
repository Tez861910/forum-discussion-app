import { sequelize } from "../../../db.js";

export const handleRealTimeGroupUpdateCreate = async (req, res) => {
  const { groupId, userId, updateType, data } = req.body;

  try {
    // Dynamically access the RealTimeGroupUpdates model using sequelize.models
    const RealTimeGroupUpdates = sequelize.models.RealTimeGroupUpdates;

    const result = await RealTimeGroupUpdates.create({
      GroupID: groupId,
      UserID: userId,
      UpdateType: updateType,
      Data: data,
    });

    if (result) {
      console.log("Real-time update for group created successfully");
      res.json({ message: "Real-time update for group created successfully" });
    } else {
      console.error("Real-time update creation for group failed");
      res
        .status(500)
        .json({ error: "Real-time update creation for group failed" });
    }
  } catch (error) {
    console.error("Error creating real-time update for group:", error);
    res.status(500).json({
      error: "Real-time update creation for group failed",
      details: error.message,
    });
  }
};
