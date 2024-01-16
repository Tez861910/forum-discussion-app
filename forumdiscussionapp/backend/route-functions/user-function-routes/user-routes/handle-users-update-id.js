import { Users, UserRoles, CommonAttributes } from "../../../db.js";
import { hashPassword } from "../../../authvalid.js";

export const handleUsersUpdateId = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const userRoleData = userData.userroles;
  const { updatedByUserId } = req.body;

  try {
    if (!userData.UserName || !userData.UserEmail || !updatedByUserId) {
      console.log("User Data and UpdatedByUserId are required");
      return res
        .status(400)
        .json({ error: "User Data and UpdatedByUserId are required" });
    }

    // Fetch the user's CommonAttributeID
    const user = await Users.findOne({ where: { UserID: id } });
    const commonAttributeId = user.CommonAttributeID;

    // Hash the password if provided
    if (userData.UserPassword) {
      userData.UserPassword = await hashPassword(userData.UserPassword);
    }

    // Update the user and associated records only if not soft deleted
    const updateUserResult = await Users.update(userData, {
      where: { UserID: id, CommonAttributeID: commonAttributeId },
    });

    if (updateUserResult[0] === 1) {
      console.log("User updated successfully");

      // Update userroles table
      if (userRoleData && userRoleData.length > 0) {
        for (const role of userRoleData) {
          await UserRoles.update(
            { RoleID: role.RoleID },
            { where: { UserID: id, CommonAttributeID: commonAttributeId } }
          );
        }
      }

      // Update the CommonAttributes table
      await CommonAttributes.update(
        { UpdatedAt: new Date(), UpdatedByUserID: updatedByUserId },
        { where: { AttributeID: commonAttributeId } }
      );

      res.json({ message: "User updated successfully" });
    } else {
      console.error("User update failed");
      res.status(500).json({ error: "User update failed" });
    }
  } catch (error) {
    console.error("Error updating user and associated records:", error);
    res
      .status(500)
      .json({ error: "User update failed", details: error.message });
  }
};
