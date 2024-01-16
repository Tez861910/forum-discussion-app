import { sequelize } from "../../../db.js";
import { Op } from "sequelize";

export const handleFriendsGet = async (req, res) => {
  const { userId } = req.params;

  try {
    // Dynamically access the Friends model using sequelize.models
    const Friends = sequelize.models.Friends;

    const result = await Friends.findAll({
      where: {
        [Op.or]: [{ UserID1: userId }, { UserID2: userId }],
      },
    });

    console.log("User friends retrieved successfully");
    res.json({ friends: result });
  } catch (error) {
    console.error("Error getting user friends:", error);
    res
      .status(500)
      .json({ error: "Error getting user friends", details: error.message });
  }
};
