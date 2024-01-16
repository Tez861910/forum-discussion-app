import { sequelize } from "../../../db.js";

export const handleMCQOptionsGetAll = async (req, res) => {
  try {
    const MCQOptions = sequelize.models.MCQOptions;
    const result = await MCQOptions.findAll();

    console.log("MCQ options retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting MCQ options:", error);
    res
      .status(500)
      .json({ error: "Error getting MCQ options", details: error.message });
  }
};
