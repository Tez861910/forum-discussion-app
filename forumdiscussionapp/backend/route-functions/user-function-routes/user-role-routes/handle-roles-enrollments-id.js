import { User, UserRoles, CommonAttributes } from "../../../db.js";
import { Op } from "sequelize";

export const handleRolesEnrollmentsId = async (req, res) => {
  const { roleId } = req.params;

  try {
    // Fetch user data for a given role ID
    const users = await User.findAll({
      where: {
        "$UserRoles.RoleID$": roleId,
        "$UserRoles.CommonAttributes.IsDeleted$": false,
      },
      include: [
        {
          model: UserRoles,
          include: [
            {
              model: CommonAttributes,
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
