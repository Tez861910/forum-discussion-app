import { RealTimeUpdates } from "../../../db.js";

export const handleUpdateGet = async (req, res) => {
  const { updateId } = req.params;

  try {
    const result = await RealTimeUpdates.findOne({
      where: { RTUpdateID: updateId },
    });

    if (result) {
      console.log("Real-time update retrieved successfully");
      res.json({ realTimeUpdate: result });
    } else {
      console.error("Real-time update not found");
      res.status(404).json({ error: "Real-time update not found" });
    }
  } catch (error) {
    console.error("Error getting real-time update:", error);
    res
      .status(500)
      .json({
        error: "Error getting real-time update",
        details: error.message,
      });
  }
};
