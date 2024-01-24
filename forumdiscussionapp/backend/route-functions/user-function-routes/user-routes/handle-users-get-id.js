import { sequelize } from "../../../db.js";

export const handleUsersGetId = async (req, res) => {
  const { id: userId } = req.params;

  try {
    // Dynamically access the models using sequelize.models
    const { Users, Genders, UserRoles, Roles, CommonAttributes } =
      sequelize.models;

    // Fetch user data including the gender name and role name
    const user = await Users.findOne({
      where: { UserID: userId },
      include: [
        {
          model: Genders,
          attributes: ["GenderName"],
        },
        {
          model: UserRoles,
          attributes: ["RoleID"],
          include: [
            {
              model: Roles,
              attributes: ["RoleName"],
            },
          ],
        },
        {
          model: CommonAttributes,
          where: { isDeleted: false },
          attributes: [],
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
