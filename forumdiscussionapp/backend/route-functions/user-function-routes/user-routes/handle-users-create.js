import { query } from "../../../db.js";
import { createToken, hashPassword } from "../../../authvalid.js";

export const handleUsersCreate = async (req, res) => {
  const {
    name,
    email,
    password,
    roleId,
    genderId,
    address,
    phoneNumber,
    avatarPath,
    dateOfBirth,
    createdByUserId,
  } = req.body;

  try {
    if (
      !name ||
      !email ||
      !password ||
      !roleId ||
      !genderId ||
      !createdByUserId ||
      !avatarPath
    ) {
      console.log("Missing user data");
      return res.status(400).json({ error: "Missing user data" });
    }

    const hashedPassword = await hashPassword(password);

    // Create a record in the CommonAttributes table
    const sqlCommonAttributes = `
      INSERT INTO CommonAttributes (CreatedAt, CreatedByUserID, IsDeleted)
      VALUES (NOW(), ?, FALSE)
    `;
    const [commonAttributesResult] = await query(sqlCommonAttributes, [
      createdByUserId,
    ]);

    if (commonAttributesResult.affectedRows !== 1) {
      console.log("Error creating common attributes");
      return res.status(500).json({ error: "User registration failed" });
    }

    const commonAttributeId = commonAttributesResult.insertId;

    // Insert user data with CommonAttributeID
    const sqlUser = `
      INSERT INTO Users (UserName, UserEmail, UserPassword, GenderID, Address, PhoneNumber, AvatarPath, DateOfBirth, CommonAttributeID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [userResult] = await query(sqlUser, [
      name,
      email,
      hashedPassword,
      genderId,
      address,
      phoneNumber,
      avatarPath,
      dateOfBirth,
      commonAttributeId,
    ]);

    if (userResult.affectedRows === 1) {
      const userId = userResult.insertId;

      // Create a new CommonAttributes record for UserRoles
      const sqlCommonAttributesUserRoles = `
        INSERT INTO CommonAttributes (CreatedAt, CreatedByUserID, IsDeleted)
        VALUES (NOW(), ?, FALSE)
      `;
      const [commonAttributesUserRolesResult] = await query(
        sqlCommonAttributesUserRoles,
        [createdByUserId]
      );

      if (commonAttributesUserRolesResult.affectedRows !== 1) {
        console.log("Error creating common attributes for UserRoles");
        return res.status(500).json({ error: "User registration failed" });
      }

      const commonAttributeIdUserRoles =
        commonAttributesUserRolesResult.insertId;

      // Insert a record into userroles to associate the user with the role
      const sqlUserRoles = `
        INSERT INTO UserRoles (UserID, RoleID, CommonAttributeID)
        VALUES (?, ?, ?)
      `;
      const [userRolesResult] = await query(sqlUserRoles, [
        userId,
        roleId,
        commonAttributeIdUserRoles,
      ]);

      if (userRolesResult.affectedRows === 1) {
        const payload = {
          email,
          roleId,
        };
        const token = createToken(payload);
        console.log("User registered successfully for email: " + email);
        res.json({ message: "User registered successfully", token });
      } else {
        console.log("User registration failed for email: " + email);
        res.status(500).json({ error: "User registration failed" });
      }
    } else {
      console.log("User registration failed for email: " + email);
      res.status(500).json({ error: "User registration failed" });
    }
  } catch (error) {
    console.error("Error during creation:", error);
    res
      .status(500)
      .json({ error: "User Creation Failed", details: error.message });
  }
};
