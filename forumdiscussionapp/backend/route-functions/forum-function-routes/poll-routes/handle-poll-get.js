import { sequelize } from "../../../db.js";

export const handlePollGet = async (req, res) => {
  try {
    const Polls = sequelize.models.Polls;

    const result = await Polls.findAll();

    console.log("Polls retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting polls:", error);
    res
      .status(500)
      .json({ error: "Error getting polls", details: error.message });
  }
};
