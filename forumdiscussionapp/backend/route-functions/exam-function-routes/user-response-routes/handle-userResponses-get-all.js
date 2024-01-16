import { sequelize } from "../../../db.js";

export const handleUserResponsesGetAll = async (req, res) => {
  try {
    const UserResponses = sequelize.models.UserResponses;
    const result = await UserResponses.findAll();

    console.log("User responses retrieved successfully");
    res.json(result);
  } catch (error) {
    console.error("Error getting user responses:", error);
    res
      .status(500)
      .json({ error: "Error getting user responses", details: error.message });
  }
};
