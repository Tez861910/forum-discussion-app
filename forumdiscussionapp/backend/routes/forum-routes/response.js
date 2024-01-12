import express from "express";
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

// Get all responses for a comment
router.get("/get/:commentId", getAllResponses);

// Create a new response for a comment
router.post("/create/:commentId", validateResponseCreate, createResponse);

// Update a response
router.put("/update/:responseId", validateResponseUpdate, updateResponse);

// Delete a response
router.delete("/delete/:responseId", validateResponseDelete, deleteResponse);

export default router;
