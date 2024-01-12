import express from "express";
import { createRefreshTokenAndSetCookies } from "../../authvalid.js";

const router = express.Router();

// Refresh access token
router.post("/refresh-token", async (req, res) => {
  try {
    // Generate a new access token
    const newAccessToken = createRefreshTokenAndSetCookies(
      req.userId,
      req.email,
      req.roleId,
      res
    );

    res.json({ access_token: newAccessToken });
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

export default router;
