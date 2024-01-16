import { Roles, CommonAttributes } from "../../../db.js";

export const handleRolesCreate = async (req, res) => {
  const { roleName, description, createdByUserID } = req.body;

  try {
    // Validate inputs
    if (!roleName || !createdByUserID) {
      console.log("Role name and createdByUserID are required");
      return res
        .status(400)
        .json({ error: "Role name and createdByUserID are required" });
    }

    // Create a new CommonAttributes entry
    const commonAttributes = await CommonAttributes.create({
      CreatedByUserID: createdByUserID,
    });

    // Create a new Role
    const role = await Roles.create({
      RoleName: roleName,
      RoleDescription: description,
      CommonAttributeID: commonAttributes.AttributeID,
    });

    console.log("Role created successfully");
    res.json({ message: "Role created successfully" });
  } catch (error) {
    console.error("Error creating role:", error);
    res
      .status(500)
      .json({ error: "Role creation failed", details: error.message });
  }
};
