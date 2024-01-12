import express from "express";
import {
  validateAttachmentCreate,
  validateAttachmentUpdate,
  validateAttachmentDelete,
} from "../../body-validation/accessories-validation-functions/attachment-validation.js";

import { handleAttachmentCreate } from "../../route-functions/accessories-function-routes/attachment-routes/handle-attachment-create.js";
import { handleAttachmentUpdate } from "../../route-functions/accessories-function-routes/attachment-routes/handle-attachment-update.js";
import { handleAttachmentDelete } from "../../route-functions/accessories-function-routes/attachment-routes/handle-attachment-delete.js";
import { handleAttachmentGetAll } from "../../route-functions/accessories-function-routes/attachment-routes/handle-attachment-get-all.js";

const router = express.Router();

// Get all attachments
router.get("/get/all", handleAttachmentGetAll);

// Create a new attachment
router.post("/create", validateAttachmentCreate, handleAttachmentCreate);

// Update an attachment
router.put(
  "/update/:attachmentId",
  validateAttachmentUpdate,
  handleAttachmentUpdate
);

// Delete an attachment
router.delete(
  "/delete/:attachmentId",
  validateAttachmentDelete,
  handleAttachmentDelete
);

export default router;
