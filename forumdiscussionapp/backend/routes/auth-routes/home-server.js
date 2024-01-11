import express from "express";
import multer from "multer";
import path from "path";
import { readCookie } from "react-cookies";
import { query } from "../../db.js";
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

router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  console.log("Upload avatar route hit");

  // Check if the user is authenticated
  if (!req.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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

router.get("/check-auth", (req, res) => {
  const token = readCookie(req, "token");
  if (token) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.json({ success: true });
});

export default router;
