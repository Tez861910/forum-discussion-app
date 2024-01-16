import { sequelize } from "../../../db.js";

export const handleRequestUpdate = async (req, res) => {
  const { requestId } = req.params;
  const { requestStatus } = req.body;

  try {
    // Dynamically access the FriendRequests model using sequelize.models
    const FriendRequests = sequelize.models.FriendRequests;

    const result = await FriendRequests.update(
      { RequestStatus: requestStatus },
      { where: { RequestID: requestId } }
    );

    if (result[0] === 1) {
      console.log("Friend request updated successfully");
      res.json({ message: "Friend request updated successfully" });
    } else {
      console.error("Friend request update failed");
      res.status(500).json({ error: "Friend request update failed" });
    }
  } catch (error) {
    console.error("Error updating friend request:", error);
    res
      .status(500)
      .json({ error: "Friend request update failed", details: error.message });
  }
};
