import { Users, CommonAttributes } from "../../../db.js";
import { hashPassword } from "../../../authvalid.js";

export const handleUsersUpdateUsers = async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;
  const createdByUserID = req.body.createdByUserID;

  try {
    if (
      !updatedUserData.UserName &&
      !updatedUserData.UserEmail &&
      !updatedUserData.UserPassword
    ) {
      console.log("No valid fields provided for update");
      return res
        .status(400)
        .json({ error: "No valid fields provided for update" });
    }

    // Hash the password if provided
    if (updatedUserData.UserPassword) {
      updatedUserData.UserPassword = await hashPassword(
        updatedUserData.UserPassword
      );
    }

    // Fetch the user's CommonAttributeID
    const user = await Users.findOne({ where: { UserID: id } });
    const commonAttributeId = user.CommonAttributeID;

    // Check IsDeleted in common attributes table
    const commonAttributes = await CommonAttributes.findOne({
      where: { AttributeID: commonAttributeId },
    });

    if (commonAttributes.IsDeleted) {
      return res.status(400).json({ error: "User is marked as deleted" });
    }

    // Update the user and associated records only if not soft deleted
    const updateUserResult = await Users.update(updatedUserData, {
      where: { UserID: id, CommonAttributeID: commonAttributeId },
    });

    // Update the CommonAttributes table
    await CommonAttributes.update(
      { UpdatedAt: new Date(), UpdatedByUserID: createdByUserID },
      { where: { AttributeID: commonAttributeId } }
    );

    if (updateUserResult[0] === 1) {
      console.log("User updated successfully");
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
