import express from "express";
import { sequelize } from "../../db.js";
import {
  createAccessTokenAndSetCookies,
  createRefreshTokenAndSetCookies,
  hashPassword,
} from "../../authvalid.js";
import { validateSignup } from "../../body-validation/auth-validation-functions/signup-validation.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, address, phoneNumber, dateOfBirth, genderID } =
    req.body;
  const Users = sequelize.models.Users;
  const UserRoles = sequelize.models.UserRoles;
  const Genders = sequelize.models.Genders;

  try {
    // Validate request body
    const validationResult = validateSignup({
      name,
      email,
      password,
      address,
      phoneNumber,
      dateOfBirth,
      genderID,
    });

    if (!name || !email || !password || !genderID) {
      console.log("Missing user data");
      return res.status(400).json({ error: "Missing user data" });
    }

    // Check if the provided gender is valid
    const genderResult = await Genders.findByPk(genderID);

    if (!genderResult) {
      console.log("Invalid gender ID");
      return res.status(400).json({ error: "Invalid gender ID" });
    }

    const userData = {
      UserName: name,
      UserEmail: email,
      UserPassword: await hashPassword(password),
      PhoneNumber: phoneNumber || null,
      Address: address || null,
      DateOfBirth: dateOfBirth || null,
      GenderID: genderID,
    };

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    const userResult = await Users.create(userData);

    if (userResult) {
      const userId = userResult.UserID;

      const studentRoleId = 3;
      const userRolesResult = await UserRoles.create({
        UserID: userId,
        RoleID: studentRoleId,
      });

      if (userRolesResult) {
        const payload = {
          email,
          roleId: studentRoleId,
        };

        // Create and set cookies for tokens
        const token = createAccessTokenAndSetCookies(payload, res);
        const refreshToken = createRefreshTokenAndSetCookies(payload, res);

        console.log("User registered successfully for email: " + email);
        res.json({
          message: "User registered successfully",
          token,
          refreshToken,
        });
      } else {
        console.log("User registration failed for email: " + email);
        res.status(500).json({ error: "User registration failed" });
      }
    } else {
      console.log("User registration failed for email: " + email);
      res.status(500).json({ error: "User registration failed" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
});

export default router;
