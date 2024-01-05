import express from "express";
import { query } from "../../db.js";
import multer from "multer";
import path from "path";
import {
  validateAvatarUpload,
  validateTokenRefresh,
} from "../../body-validation/auth-validation-functions/home-validation.js";
import { verifyRefreshToken, createToken } from "../../authvalid.js";

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Avatar upload route
router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  console.log("Upload avatar route hit");

  // Validate request body
  const validationResult = validateAvatarUpload(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: validationResult.error.details[0].message });
  }

  const filePath = req.file.path;

  try {
    const [rows, fields] = await query(
      "UPDATE Users SET AvatarPath = ? WHERE UserID = ?",
      [filePath, req.body.userId]
    );

    res.json({ message: "Avatar uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the avatar." });
  }
});

// Token refresh route
router.post("/refresh-token", verifyRefreshToken, async (req, res) => {
  // Validate request body
  const validationResult = validateTokenRefresh(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ error: validationResult.error.details[0].message });
  }

  try {
    // Generate a new access token
    const newAccessToken = createToken(req.userId, req.email, req.roleId);

    res.json({ access_token: newAccessToken });
  } catch (err) {
    console.error("Error refreshing token:", err);
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

export default router;
