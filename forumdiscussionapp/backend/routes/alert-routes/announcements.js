import express from "express";
import {
  validateAnnouncementCreate,
  validateAnnouncementUpdate,
  validateAnnouncementDelete,
} from "../../body-validation/alert-validation-functions/announcement-validation.js";

import { handleAnnouncementCreate } from "../../route-functions/alert-function-routes/announcement-routes/handle-announcement-create.js";
import { handleAnnouncementUpdate } from "../../route-functions/alert-function-routes/announcement-routes/handle-announcement-update.js";
import { handleAnnouncementDelete } from "../../route-functions/alert-function-routes/announcement-routes/handle-announcement-delete.js";
import { handleAnnouncementGetAll } from "../../route-functions/alert-function-routes/announcement-routes/handle-announcement-get-all.js";

const router = express.Router();

// Get all announcements
router.get("/get/all", handleAnnouncementGetAll);

// Create a new announcement
router.post("/create", validateAnnouncementCreate, handleAnnouncementCreate);

// Update an announcement
router.put(
  "/update/:announcementId",
  validateAnnouncementUpdate,
  handleAnnouncementUpdate
);

// Delete an announcement
router.delete(
  "/delete/:announcementId",
  validateAnnouncementDelete,
  handleAnnouncementDelete
);

export default router;
