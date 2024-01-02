const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
    validateEventCreate,
    validateEventEdit,
    validateEventDelete,
  } = require('../body-validation/event-validation');

const {getAllEvents} =require('../route-files/event-routes/get-all-event')
const {createEvent} =require('../route-files/event-routes/create-event')
const {editEvent} =require('../route-files/event-routes/edit-event')
const {deleteEvent} =require('../route-files/event-routes/delete-event')

router.use(express.json());

// Endpoint to create a new event
router.post('/create', verifyJwt, validateEventCreate, createEvent);

// Endpoint to get all events
router.get('/get', verifyJwt, getAllEvents);

// Endpoint to edit an existing event
router.put('/edit/:eventId', verifyJwt, validateEventEdit, editEvent);

// Endpoint to delete an event
router.delete('/delete/:eventId', verifyJwt, validateEventDelete, deleteEvent);

module.exports = router;