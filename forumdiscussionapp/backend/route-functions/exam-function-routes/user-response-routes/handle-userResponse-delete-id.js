import { sequelize } from "../../../db.js";

export const handleUserResponseDeleteById = async (req, res) => {
  const { userResponseId } = req.params;

  try {
    const UserResponses = sequelize.models.UserResponses;
    const result = await UserResponses.destroy({
      where: { UserResponseID: userResponseId },
    });

    if (result === 1) {
      console.log("User response deleted successfully");
      res.json({ message: "User response deleted successfully" });
    } else {
      console.error("User response deletion failed");
      res.status(500).json({ error: "User response deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting user response:", error);
    res
      .status(500)
      .json({ error: "Error deleting user response", details: error.message });
  }
};
