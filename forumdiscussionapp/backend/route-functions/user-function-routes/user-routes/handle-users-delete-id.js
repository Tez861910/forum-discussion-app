import {
  Users,
  UserCourses,
  UserRoles,
  UserSettings,
  CommonAttributes,
} from "../../../db.js";

export const handleUsersDeleteId = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the user's CommonAttributeID
    const user = await Users.findOne({ where: { UserID: id } });
    const commonAttributeId = user.CommonAttributeID;

    // Update the IsDeleted status in the CommonAttributes table
    const deleteCommonAttributesResult = await CommonAttributes.update(
      { IsDeleted: true },
      { where: { AttributeID: commonAttributeId } }
    );

    if (deleteCommonAttributesResult[0] === 1) {
      // Soft delete user-related records in other tables
      await UserCourses.update(
        { IsDeleted: true },
        { where: { UserID: id, CommonAttributeID: commonAttributeId } }
      );

      await UserRoles.update(
        { IsDeleted: true },
        { where: { UserID: id, CommonAttributeID: commonAttributeId } }
      );

      await UserSettings.update(
        { IsDeleted: true },
        { where: { UserID: id, CommonAttributeID: commonAttributeId } }
      );

      console.log("User and associated records marked as deleted successfully");
      res.json({
        message: "User and associated records marked as deleted successfully",
      });
    } else {
      console.error("User deletion failed");
      res.status(500).json({ error: "User deletion failed" });
    }
  } catch (error) {
    console.error(
      "Error marking user and associated records as deleted:",
      error
    );
    res
      .status(500)
      .json({ error: "User deletion failed", details: error.message });
  }
};
