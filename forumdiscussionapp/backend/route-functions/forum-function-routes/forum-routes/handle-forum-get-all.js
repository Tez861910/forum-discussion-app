import { sequelize } from "../../../db.js";

export const handleForumGetAll = async (req, res) => {
  try {
    const Forums = sequelize.models.Forums;

    const result = await Forums.findAll();

    console.log("Forums retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting forums:", error);
    res
      .status(500)
      .json({ error: "Error getting forums", details: error.message });
  }
};
