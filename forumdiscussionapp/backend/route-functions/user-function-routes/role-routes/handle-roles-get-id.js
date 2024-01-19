import { sequelize } from "../../../db.js";

export const handleRolesGetId = async (req, res) => {
  const { id } = req.params;

  try {
    // Dynamically access the models using sequelize.models
    const Roles = sequelize.models.Roles;
    const CommonAttributes = sequelize.models.CommonAttributes;

    // Find the role with associated CommonAttributes
    const role = await Roles.findOne({
      where: { RoleID: id },
      include: [
        {
          model: CommonAttributes,
          where: { IsDeleted: false },
        },
      ],
    });

    if (role) {
      console.log("Role fetched successfully");
      res.json({ role });
    } else {
      console.error("Role not found");
      res.status(404).json({ error: "Role not found" });
    }
  } catch (error) {
    console.error("Error fetching role:", error);
    res.status(500).json({
      error: "Role retrieval failed",
      details: error.message,
    });
  }
};
