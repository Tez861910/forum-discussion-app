const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');

router.use(express.json());

const {getAllEvents} =require('../event-routes/get-all-events')
const {createEvent} =require('../event-routes/create-event')
const {editEvent} =require('../event-routes/edit-event')
const {deleteEvent} =require('../event-routes/delete-event')

// Endpoint to create an event
router.post('/events/create', verifyJwt, createEvent);

// Endpoint to get all events
router.get('/events/get', verifyJwt, getAllEvents);

// Endpoint to edit an event
router.put('/events/edit/:eventId', verifyJwt, editEvent);

// Endpoint to delete an event
router.delete('/events/delete/:eventId', verifyJwt, deleteEvent);

module.exports = router;
