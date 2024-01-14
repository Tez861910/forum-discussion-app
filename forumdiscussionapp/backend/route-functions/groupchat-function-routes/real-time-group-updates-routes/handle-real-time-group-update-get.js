import { RealTimeGroupUpdates } from "../../../db.js";

export const handleRealTimeGroupUpdateGet = async (req, res) => {
  const { updateId } = req.params;

  try {
    const result = await RealTimeGroupUpdates.findOne({
      where: { RTGUpdateID: updateId },
    });

    if (result) {
      console.log("Real-time update for group retrieved successfully");
      res.json({ realTimeGroupUpdate: result });
    } else {
      console.error("Real-time update for group not found");
      res.status(404).json({ error: "Real-time update for group not found" });
    }
  } catch (error) {
    console.error("Error getting real-time update for group:", error);
    res.status(500).json({
      error: "Error getting real-time update for group",
      details: error.message,
    });
  }
};
