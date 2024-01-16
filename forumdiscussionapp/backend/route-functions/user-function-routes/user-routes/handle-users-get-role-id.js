import { Users, UserRoles, CommonAttributes } from "../../../db.js";

export const handleUsersGetRoleId = async (req, res) => {
  const { roleId } = req.params;

  try {
    // Fetch user data for a given role ID
    const users = await Users.findAll({
      where: { "$CommonAttributes.IsDeleted$": false },
      include: [
        {
          model: UserRoles,
          where: { RoleID: roleId },
          attributes: [],
        },
        {
          model: CommonAttributes,
          attributes: [],
        },
      ],
      attributes: ["userName"],
    });

    if (users && users.length > 0) {
      console.log("User names fetched successfully");
      res.json({ userNames: users.map((user) => user.userName) });
    } else {
      console.error("User names not found");
      res.status(404).json({ error: "User names not found" });
    }
  } catch (error) {
    console.error("Error fetching user names by role ID:", error);
    res.status(500).json({
      error: "User names retrieval by role ID failed",
      details: error.message,
    });
  }
};
