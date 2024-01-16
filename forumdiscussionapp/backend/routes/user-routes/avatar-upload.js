import express from "express";
import multer from "multer";
import path from "path";
import { Users } from "../../db.js";
import { validateAvatarUpload } from "../../body-validation/auth-validation-functions/home-validation.js";
import { verifyRefreshToken } from "../../authvalid.js";

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

router.post(
  "/upload-avatar",
  verifyRefreshToken,
  upload.single("avatar"),
  async (req, res) => {
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
      const result = await Users.update(
        { AvatarPath: filePath },
        { where: { UserID: req.body.userId } }
      );

      if (result[0] === 1) {
        res.json({ message: "Avatar uploaded successfully!" });
      } else {
        console.error("An error occurred while uploading the avatar.");
        res
          .status(500)
          .json({ error: "An error occurred while uploading the avatar." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while uploading the avatar." });
    }
  }
);

export default router;
