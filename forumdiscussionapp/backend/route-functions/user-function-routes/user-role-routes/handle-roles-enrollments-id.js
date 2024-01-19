import { sequelize } from "../../../db.js";

export const handleRolesEnrollmentsId = async (req, res) => {
  const { roleId } = req.params;

  try {
    // Dynamically access the models using sequelize.models
    const Users = sequelize.models.Users;
    const UserRoles = sequelize.models.UserRoles;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Fetch user data for a given role ID
    const users = await Users.findAll({
      include: [
        {
          model: UserRoles,
          where: { RoleID: roleId },
          include: [
            {
              model: CommonAttributes,
              where: { IsDeleted: false },
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
      attributes: ["UserID", "UserName"],
    });

    const enrollmentsResult = {};
    users.forEach((user) => {
      if (!enrollmentsResult[user.UserID]) {
        enrollmentsResult[user.UserID] = [];
      }
      enrollmentsResult[user.UserID].push({
        UserID: user.UserID,
        UserName: user.UserName,
      });
    });

    console.log("Usernames fetched successfully");
    res.json({ enrollments: enrollmentsResult });
  } catch (error) {
    console.error("Error fetching usernames by role ID:", error);
    res.status(500).json({
      error: "Usernames retrieval by role ID failed",
      details: error.message,
    });
  }
};
