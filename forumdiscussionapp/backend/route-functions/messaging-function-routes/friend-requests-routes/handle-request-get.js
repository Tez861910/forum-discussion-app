import { sequelize } from "../../../db.js";

export const handleRequestGet = async (req, res) => {
  try {
    // Dynamically access the FriendRequests model using sequelize.models
    const FriendRequests = sequelize.models.FriendRequests;

    const result = await FriendRequests.findAll();

    if (result.length > 0) {
      console.log("Friend request retrieved successfully");
      res.json({ friendRequest: result[0] });
    } else {
      console.error("Friend request not found");
      res.status(404).json({ error: "Friend request not found" });
    }
  } catch (error) {
    console.error("Error getting friend request:", error);
    res
      .status(500)
      .json({ error: "Error getting friend request", details: error.message });
  }
};
