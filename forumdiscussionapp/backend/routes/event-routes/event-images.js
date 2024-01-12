import express from "express";
import {
  validateImageCreate,
  validateImageUpdate,
  validateImageDelete,
} from "../../body-validation/event-validation-functions/event-image-validation.js";

import { handleImageCreate } from "../../route-functions/event-function-routes/event-image-routes/handle-image-create.js";
import { handleImageUpdate } from "../../route-functions/event-function-routes/event-image-routes/handle-image-update.js";
import { handleImageDelete } from "../../route-functions/event-function-routes/event-image-routes/handle-image-delete.js";
import { handleImageGetAll } from "../../route-functions/event-function-routes/event-image-routes/handle-image-get-all.js";

const router = express.Router();

// Get all event images
router.get("/get/all", handleImageGetAll);

// Create new event image
router.post("/create", validateImageCreate, handleImageCreate);

// Update event image
router.put("/update/:imageId", validateImageUpdate, handleImageUpdate);

// Delete event image
router.delete("/delete/:imageId", validateImageDelete, handleImageDelete);

export default router;
