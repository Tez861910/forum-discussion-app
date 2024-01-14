import { User, UserRoles, UserSettings } from "../../../db.js";

export const handleUsersGetId = async (req, res) => {
  const { id: userId } = req.params;

  try {
    // Fetch user data including the role ID and user settings
    const user = await User.findOne({
      where: { UserID: userId },
      include: [
        {
          model: UserRoles,
          attributes: ["RoleID"],
        },
        {
          model: UserSettings,
          attributes: ["Theme", "DarkMode", "Language", "EmailNotifications"],
        },
      ],
    });

    if (user) {
      console.log("User fetched successfully");
      res.json({ user });
    } else {
      console.error("User not found");
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res
      .status(500)
      .json({ error: "User retrieval by ID failed", details: error.message });
  }
};
