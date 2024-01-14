import { UserStatus } from "../../../db.js";

export const handleUserStatusGet = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await UserStatus.findOne({
      where: { UserID: userId },
    });

    if (result) {
      console.log("User status retrieved successfully");
      res.json({ userStatus: result });
    } else {
      console.error("User status not found");
      res.status(404).json({ error: "User status not found" });
    }
  } catch (error) {
    console.error("Error getting user status:", error);
    res
      .status(500)
      .json({ error: "Error getting user status", details: error.message });
  }
};
