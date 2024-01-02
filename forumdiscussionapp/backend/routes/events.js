const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
    validateEventCreate,
    validateEventEdit,
    validateCreateRecurringEvent,
    validateCreateReminder,
    validateCreateGuestSpeaker,
  } = require('../body-validation/event-validation');

const {getAllEvents} =require('../route-files/event-routes/get-all-event')
const {createEvent} =require('../route-files/event-routes/create-event')
const {editEvent} =require('../route-files/event-routes/edit-event')
const {deleteEvent} =require('../route-files/event-routes/delete-event')

const {getRecurringEvents} =require('../route-files/event-routes/get-recurring-event')
const {createRecurringEvent} =require('../route-files/event-routes/create-recurring-event')

const {getReminders} =require('../route-files/event-routes/get-reminder')
const {createReminder} =require('../route-files/event-routes/create-reminder')

const {getGuestSpeakers} =require('../route-files/event-routes/get-guest-speaker')
const {createGuestSpeaker} =require('../route-files/event-routes/create-guest-speaker')

router.use(express.json());

// Endpoints for basic event operations
router.post('/events/create', verifyJwt, validateEventCreate, createEvent);
router.get('/events/get', verifyJwt, getAllEvents);
router.put('/events/edit/:eventId', verifyJwt, validateEventEdit, editEvent);
router.delete('/events/delete/:eventId', verifyJwt, deleteEvent);

// Endpoints for recurring events
router.get('/events/:eventId/recurring', verifyJwt, getRecurringEvents);
router.post('/events/:eventId/recurring/create', verifyJwt, validateCreateRecurringEvent, createRecurringEvent);

// Endpoints for reminders
router.get('/events/:eventId/reminders', verifyJwt, getReminders);
router.post('/events/:eventId/reminders/create', verifyJwt, validateCreateReminder, createReminder);

// Endpoints for guest speakers
router.get('/events/:eventId/guest-speakers', verifyJwt, getGuestSpeakers);
router.post('/events/:eventId/guest-speakers/create', verifyJwt, validateCreateGuestSpeaker, createGuestSpeaker);

module.exports = router;