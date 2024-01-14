import { UserStatus } from "../../../db.js";

export const handleStatusUpdate = async (req, res) => {
  const { userId } = req.params;
  const { isOnline } = req.body;

  try {
    const result = await UserStatus.upsert({
      UserID: userId,
      IsOnline: isOnline,
      LastOnline: new Date(),
    });

    console.log("User status updated successfully");
    res.json({ message: "User status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res
      .status(500)
      .json({ error: "Error updating user status", details: error.message });
  }
};
