import express from "express";
import {
  validateRealTimeGroupUpdateCreate,
  validateRealTimeGroupUpdateGet,
} from "../../body-validation/groupchat-validation-functions/real-time-group-update-validation.js";

import { handleRealTimeGroupUpdateCreate } from "../../route-functions/groupchat-function-routes/real-time-group-updates-routes/handle-real-time-group-update-create.js";
import { handleRealTimeGroupUpdateGet } from "../../route-functions/groupchat-function-routes/real-time-group-updates-routes/handle-real-time-group-update-get.js";

const router = express.Router();

// Create real-time update for group
router.post(
  "/create",
  validateRealTimeGroupUpdateCreate,
  handleRealTimeGroupUpdateCreate
);

// Get real-time update for group by ID
router.get(
  "/get/:updateId",
  validateRealTimeGroupUpdateGet,
  handleRealTimeGroupUpdateGet
);

export default router;
