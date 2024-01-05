import express from "express";
import cors from "cors";
import { verifyJwt } from "../../authvalid.js";
import {
  validateUserSettingsCreate,
  validateUserSettingsUpdate,
  validateUserSettingsDelete,
} from "../../body-validation/activity-validation-functions/user-settings-validation.js";

import { handleUserSettingsCreate } from "../../route-functions/activity-function-routes/user-settings-routes/handle-user-settings-create.js";
import { handleUserSettingsUpdate } from "../../route-functions/activity-function-routes/user-settings-routes/handle-user-settings-update.js";
import { handleUserSettingsDelete } from "../../route-functions/activity-function-routes/user-settings-routes/handle-user-settings-delete.js";
import { handleUserSettingsGetAll } from "../../route-functions/activity-function-routes/user-settings-routes/handle-user-settings-get-all.js";

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all user settings
router.get("/get/all", verifyJwt, handleUserSettingsGetAll);

// Create new user settings
router.post(
  "/create",
  verifyJwt,
  validateUserSettingsCreate,
  handleUserSettingsCreate
);

// Update user settings
router.put(
  "/update/:settingId",
  verifyJwt,
  validateUserSettingsUpdate,
  handleUserSettingsUpdate
);

// Delete user settings
router.delete(
  "/delete/:settingId",
  verifyJwt,
  validateUserSettingsDelete,
  handleUserSettingsDelete
);

export default router;
