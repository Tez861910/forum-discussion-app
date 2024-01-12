import express from "express";
import {
  validateUpdateCreate,
  validateUpdateGet,
} from "../../body-validation/messaging-validation-functions/real-time-updates-validation.js";

import { handleUpdateCreate } from "../../route-functions/messaging-function-routes/real-time-updates-routes/handle-update-create.js";
import { handleUpdateGet } from "../../route-functions/messaging-function-routes/real-time-updates-routes/handle-update-get.js";

const router = express.Router();

// Create real-time update
router.post("/create", validateUpdateCreate, handleUpdateCreate);

// Get real-time update by ID
router.get("/get/:updateId", validateUpdateGet, handleUpdateGet);

export default router;
