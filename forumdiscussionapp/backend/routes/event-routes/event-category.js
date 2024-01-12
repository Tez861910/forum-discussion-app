import express from "express";
import {
  validateCreateEventCategory,
  validateEditEventCategory,
  validateAssignEventCategory,
  validateEditAssignedEventCategory,
} from "../../body-validation/event-validation-functions/event-category-validation.js";

import { createEventCategory } from "../../route-functions/event-function-routes/event-category-routes/create-event-category.js";
import { getEventCategories } from "../../route-functions/event-function-routes/event-category-routes/get-event-categories.js";
import { editEventCategory } from "../../route-functions/event-function-routes/event-category-routes/edit-event-category.js";
import { softDeleteEventCategory } from "../../route-functions/event-function-routes/event-category-routes/delete-event-category.js";
import { assignEventCategory } from "../../route-functions/event-function-routes/event-category-routes/assign-event-category.js";
import { editAssignedEventCategory } from "../../route-functions/event-function-routes/event-category-routes/edit-assigned-event-category.js";
import { softDeleteAssignedEventCategory } from "../../route-functions/event-function-routes/event-category-routes/delete-assigned-event-category.js";

const router = express.Router();

// Endpoint to get all event categories
router.get("/get", getEventCategories);

// Endpoint to create a new event category
router.post("/create", validateCreateEventCategory, createEventCategory);

// Endpoint to edit an existing event category
router.put("/edit/:categoryId", validateEditEventCategory, editEventCategory);

// Endpoint to soft delete an event category
router.delete("/soft-delete/:categoryId", softDeleteEventCategory);

// Endpoint to assign an event category to an event
router.post(
  "/:eventId/categories/assign/:categoryId",
  validateAssignEventCategory,
  assignEventCategory
);

// Endpoint to edit an assigned event category
router.put(
  "/:eventId/categories/edit/:categoryId",
  validateEditAssignedEventCategory,
  editAssignedEventCategory
);

// Endpoint to soft delete an assigned event category
router.delete(
  "/:eventId/categories/soft-delete/:categoryId",
  softDeleteAssignedEventCategory
);

export default router;
