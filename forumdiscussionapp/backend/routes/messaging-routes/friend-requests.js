import express from "express";
import { verifyJwt } from "../../authvalid.js";
import {
  validateRequestCreate,
  validateRequestUpdate,
  validateRequestGet,
} from "../../body-validation/messaging-validation-functions/friend-requests-validation.js";

import { handleRequestCreate } from "../../route-functions/messaging-function-routes/friend-requests-routes/handle-request-create.js";
import { handleRequestUpdate } from "../../route-functions/messaging-function-routes/friend-requests-routes/handle-request-update.js";
import { handleRequestGet } from "../../route-functions/messaging-function-routes/friend-requests-routes/handle-request-get.js";

const router = express.Router();

router.use(express.json());

// Create new friend request
router.post("/create", verifyJwt, validateRequestCreate, handleRequestCreate);

// Update friend request status
router.put(
  "/update/:requestId",
  verifyJwt,
  validateRequestUpdate,
  handleRequestUpdate
);

// Get friend request by ID
router.get("/get/:requestId", verifyJwt, validateRequestGet, handleRequestGet);

export default router;
