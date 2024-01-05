import express from "express";
import cors from "cors";
import { verifyJwt } from "../../authvalid.js";
import {
  validateUserResponseCreate,
  validateUserResponseUpdate,
  validateUserResponseDelete,
} from "../../body-validation/exam-validation-functions/user-response-validation.js";

import { handleUserResponseDeleteById } from "../../route-functions/exam-function-routes/user-response-routes/handle-userResponse-delete-id.js";
import { handleUserResponseUpdateById } from "../../route-functions/exam-function-routes/user-response-routes/handle-userResponse-update-id.js";
import { handleUserResponseCreate } from "../../route-functions/exam-function-routes/user-response-routes/handle-userResponse-create.js";
import { handleUserResponsesGetAll } from "../../route-functions/exam-function-routes/user-response-routes/handle-userResponses-get-all.js";

const router = express.Router();

router.use(express.json());
router.use(cors());

// Get all user responses
router.get("/get/all", verifyJwt, handleUserResponsesGetAll);

// Create a new user response
router.post(
  "/create",
  verifyJwt,
  validateUserResponseCreate,
  handleUserResponseCreate
);

// Update a user response
router.put(
  "/update/:userResponseId",
  verifyJwt,
  validateUserResponseUpdate,
  handleUserResponseUpdateById
);

// Delete a user response
router.delete(
  "/delete/:userResponseId",
  verifyJwt,
  validateUserResponseDelete,
  handleUserResponseDeleteById
);

export default router;
