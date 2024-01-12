import express from "express";
import {
  validateEventCreate,
  validateEventEdit,
  validateEventDelete,
} from "../../body-validation/event-validation-functions/event-validation.js";

import { getAllEvents } from "../../route-functions/event-function-routes/event-routes/get-all-event.js";
import { createEvent } from "../../route-functions/event-function-routes/event-routes/create-event.js";
import { editEvent } from "../../route-functions/event-function-routes/event-routes/edit-event.js";
import { deleteEvent } from "../../route-functions/event-function-routes/event-routes/delete-event.js";

const router = express.Router();

// Endpoint to create a new event
router.post("/create", validateEventCreate, createEvent);

// Endpoint to get all events
router.get("/get", getAllEvents);

// Endpoint to edit an existing event
router.put("/edit/:eventId", validateEventEdit, editEvent);

// Endpoint to delete an event
router.delete("/delete/:eventId", validateEventDelete, deleteEvent);

export default router;
