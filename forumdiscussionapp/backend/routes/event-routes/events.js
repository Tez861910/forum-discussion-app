import express from "express";
import { verifyJwt } from "../../authvalid.js";
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

router.use(express.json());

// Endpoint to create a new event
router.post("/create", verifyJwt, validateEventCreate, createEvent);

// Endpoint to get all events
router.get("/get", verifyJwt, getAllEvents);

// Endpoint to edit an existing event
router.put("/edit/:eventId", verifyJwt, validateEventEdit, editEvent);

// Endpoint to delete an event
router.delete("/delete/:eventId", verifyJwt, validateEventDelete, deleteEvent);

export default router;
