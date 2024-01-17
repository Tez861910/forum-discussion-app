import express from "express";
import { sequelize } from "../../db.js";
import { validateLogin } from "../../body-validation/auth-validation-functions/login-validation.js";
import {
  createAccessTokenAndSetCookies,
  verifyPassword,
  createRefreshTokenAndSetCookies,
} from "../../authvalid.js";

const router = express.Router();

// Handle user login
router.post("/login", validateLogin, async (req, res) => {
  const { email, password } = req.body || {};
  const Users = sequelize.models.Users;
  const UserRoles = sequelize.models.UserRoles;
  const CommonAttributes = sequelize.models.CommonAttributes;

  try {
    // Fetch user data from the database with associations
    const userData = await Users.findOne({
      where: { UserEmail: email },
      include: [
        {
          model: UserRoles,
          required: true,
          attributes: ["RoleID"],
        },
        {
          model: CommonAttributes,
          required: true,
          where: { IsDeleted: false },
        },
      ],
    });

    // Log the userData object
    console.log(JSON.stringify(userData, null, 2));

    if (!userData || !userData.UserPassword) {
      console.log("No active user found with this email: " + email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Verify the provided password
    const hashedPassword = userData.UserPassword;
    const isPasswordValid = await verifyPassword(password, hashedPassword);

    if (!isPasswordValid) {
      console.log("Incorrect password for email: " + email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate access token and refresh token
    const token = createAccessTokenAndSetCookies(
      userData.UserID,
      userData.UserEmail,
      userData.UserRoles[0]?.RoleId,
      res
    );
    const refreshToken = createRefreshTokenAndSetCookies(
      userData.UserID,
      userData.UserEmail,
      userData.UserRoles[0]?.RoleId,
      res
    );

    console.log("Login successful for email: " + email);

    // Send response with user details and tokens
    res.json({
      success: true,
      message: "Login successful",
      userId: userData.UserID,
      roleId: userData.UserRoles[0]?.RoleID,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Login failed with error:", error);
    res.status(500).json({ error: "Login Failed", details: error.message });
  }
});

export default router;
