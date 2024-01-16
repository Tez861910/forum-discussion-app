import { sequelize } from "../../../db.js";

export const handleFriendsCreate = async (req, res) => {
  const { userId1, userId2 } = req.body;

  try {
    // Dynamically access the Friends model using sequelize.models
    const Friends = sequelize.models.Friends;

    const result = await Friends.create({
      UserID1: userId1,
      UserID2: userId2,
    });

    if (result) {
      console.log("Friendship created successfully");
      res.json({ message: "Friendship created successfully" });
    } else {
      console.error("Friendship creation failed");
      res.status(500).json({ error: "Friendship creation failed" });
    }
  } catch (error) {
    console.error("Error creating friendship:", error);
    res
      .status(500)
      .json({ error: "Friendship creation failed", details: error.message });
  }
};
