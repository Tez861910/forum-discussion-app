import express from "express";
import { verifyJwt } from "../../authvalid.js";
import {
  validateResponseCreate,
  validateResponseUpdate,
  validateResponseDelete,
} from "../../body-validation/forum-validation-functions/response-validation.js";

import { getAllResponses } from "../../route-functions/forum-function-routes/response-routes/get-all-responses.js";
import { createResponse } from "../../route-functions/forum-function-routes/response-routes/create-response.js";
import { updateResponse } from "../../route-functions/forum-function-routes/response-routes/update-response.js";
import { deleteResponse } from "../../route-functions/forum-function-routes/response-routes/delete-response.js";

const router = express.Router();

router.use(express.json());

// Get all responses for a comment
router.get("/get/:commentId", verifyJwt, getAllResponses);

// Create a new response for a comment
router.post(
  "/create/:commentId",
  verifyJwt,
  validateResponseCreate,
  createResponse
);

// Update a response
router.put(
  "/update/:responseId",
  verifyJwt,
  validateResponseUpdate,
  updateResponse
);

// Delete a response
router.delete(
  "/delete/:responseId",
  verifyJwt,
  validateResponseDelete,
  deleteResponse
);

export default router;
