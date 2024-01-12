import express from "express";
import {
  validateAttachmentTypeCreate,
  validateAttachmentTypeUpdate,
  validateAttachmentTypeDelete,
} from "../../body-validation/accessories-validation-functions/attachment-type-validation.js";

import { handleAttachmentTypeCreate } from "../../route-functions/accessories-function-routes/attachment-type-routes/handle-attachmentType-create.js";
import { handleAttachmentTypeUpdate } from "../../route-functions/accessories-function-routes/attachment-type-routes/handle-attachmentType-update.js";
import { handleAttachmentTypeDelete } from "../../route-functions/accessories-function-routes/attachment-type-routes/handle-attachmentType-delete.js";
import { handleAttachmentTypeGetAll } from "../../route-functions/accessories-function-routes/attachment-type-routes/handle-attachmentType-get-all.js";

const router = express.Router();

// Get all attachment types
router.get("/get/all", handleAttachmentTypeGetAll);

// Create a new attachment type
router.post(
  "/create",
  validateAttachmentTypeCreate,
  handleAttachmentTypeCreate
);

// Update an attachment type
router.put(
  "/update/:attachmentTypeId",
  validateAttachmentTypeUpdate,
  handleAttachmentTypeUpdate
);

// Delete an attachment type
router.delete(
  "/delete/:attachmentTypeId",
  validateAttachmentTypeDelete,
  handleAttachmentTypeDelete
);

export default router;
