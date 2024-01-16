import { sequelize } from "../../../db.js";

export const handlePollOptionGet = async (req, res) => {
  try {
    const PollOptions = sequelize.models.PollOptions;

    const result = await PollOptions.findAll();

    console.log("Poll options retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting poll options:", error);
    res
      .status(500)
      .json({ error: "Error getting poll options", details: error.message });
  }
};
