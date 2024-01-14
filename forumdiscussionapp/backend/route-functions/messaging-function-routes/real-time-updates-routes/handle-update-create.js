import { RealTimeUpdates } from "../../../db.js";

export const handleUpdateCreate = async (req, res) => {
  const { userId, updateType, data } = req.body;

  try {
    const result = await RealTimeUpdates.create({
      UserID: userId,
      UpdateType: updateType,
      Data: data,
    });

    if (result) {
      console.log("Real-time update created successfully");
      res.json({ message: "Real-time update created successfully" });
    } else {
      console.error("Real-time update creation failed");
      res.status(500).json({ error: "Real-time update creation failed" });
    }
  } catch (error) {
    console.error("Error creating real-time update:", error);
    res
      .status(500)
      .json({
        error: "Real-time update creation failed",
        details: error.message,
      });
  }
};
