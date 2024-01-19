import { sequelize } from "../../../db.js";
import {
  hashPassword,
  createAccessTokenAndSetCookies,
} from "../../../authvalid.js";

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

    // Dynamically access the models using sequelize.models
    const { Users, CommonAttributes, UserRoles, UserSettings } =
      sequelize.models;

    // Create a record in the CommonAttributes table
    const commonAttributes = await CommonAttributes.create({
      CreatedAt: new Date(),
      CreatedByUserID: createdByUserId,
      IsDeleted: false,
    });

    // Insert user data with CommonAttributeID
    const user = await Users.create({
      UserName: name,
      UserEmail: email,
      UserPassword: hashedPassword,
      GenderID: genderId,
      Address: address,
      PhoneNumber: phoneNumber,
      AvatarPath: avatarPath,
      DateOfBirth: dateOfBirth,
      CommonAttributeID: commonAttributes.id,
    });

    // Create a new CommonAttributes record for UserRoles
    const commonAttributesUserRoles = await CommonAttributes.create({
      CreatedAt: new Date(),
      CreatedByUserID: createdByUserId,
      IsDeleted: false,
    });

    // Insert a record into userroles to associate the user with the role
    const userRoles = await UserRoles.create({
      UserID: user.id,
      RoleID: roleId,
      CommonAttributeID: commonAttributesUserRoles.id,
    });

    if (user && userRoles) {
      const payload = {
        email,
        roleId,
      };
      // Create and set cookies for the token
      const token = createAccessTokenAndSetCookies(payload, res);
      console.log(`User registered successfully for email: ${email}`);

      res.json({ message: "User registered successfully", token });
    } else {
      console.log(`User registration failed for email: ${email}`);
      res.status(500).json({ error: "User registration failed" });
    }
  } catch (error) {
    console.error("Error during creation:", error);
    res
      .status(500)
      .json({ error: "User Creation Failed", details: error.message });
  }
};
