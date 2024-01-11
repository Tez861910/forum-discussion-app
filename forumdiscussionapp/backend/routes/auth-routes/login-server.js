import express from "express";
import { query } from "../../db.js";
import {
  createToken,
  verifyPassword,
  createRefreshToken,
} from "../../authvalid.js";
import { validateLogin } from "../../body-validation/auth-validation-functions/login-validation.js";
import { readCookie } from "react-cookies";

const router = express.Router();

// Handle user login
router.post("/login", validateLogin, async (req, res) => {
  const { email, password } = req.body || {};

  try {
    // Fetch user data from the database
    const sql = `
      SELECT users.*, userroles.RoleID
      FROM users
      LEFT JOIN userroles ON users.UserID = userroles.UserID
      LEFT JOIN commonattributes ON users.CommonAttributeID = commonattributes.AttributeID
      WHERE users.UserEmail = ? AND commonattributes.IsDeleted = FALSE
    `;

    const queryResult = await query(sql, [email]);

    if (!Array.isArray(queryResult) || queryResult.length === 0) {
      console.log("No active user found with this email: " + email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const userData = queryResult[0];

    if (!userData || !userData.UserPassword) {
      console.log("User data is incomplete.");
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
    const token = createToken(
      userData.UserID,
      userData.UserEmail,
      userData.RoleID
    );
    const refreshToken = createRefreshToken(
      userData.UserID,
      userData.UserEmail,
      userData.RoleID
    );

    console.log("Login successful for email: " + email);

    // Set cookies for tokens
    res.cookie("token", token, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    // Send response with user details and tokens
    res.json({
      success: true,
      message: "Login successful",
      userId: userData.UserID,
      roleId: userData.RoleID,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Login failed with error:", error);
    res.status(500).json({ error: "Login Failed", details: error.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    // Read refresh token from the request cookies
    const refreshToken = readCookie(req, "refreshToken");

    if (!refreshToken) {
      console.log("No refresh token found in cookies");
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = createToken(req.userId, req.email, req.roleId);

    // Set the new access token in cookies
    res.cookie("token", newAccessToken, { httpOnly: true });

    res.json({ access_token: newAccessToken });
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

export default router;
