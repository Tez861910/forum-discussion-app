const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
    validateEventCreate,
    validateEventEdit,
    validateAssignEventCategory,
    validateCreateRecurringEvent,
    validateCreateReminder,
    validateCreateGuestSpeaker,
  } = require('../body-validation/event-validation');

const {getAllEvents} =require('../event-routes/get-all-event')
const {createEvent} =require('../event-routes/create-event')
const {editEvent} =require('../event-routes/edit-event')
const {deleteEvent} =require('../event-routes/delete-event')

const {getEventCategories} =require('../event-routes/get-event-categories')
const {createEventCategory} =require('../event-routes/create-event-category')
const {assignEventCategory} =require('../event-routes/assign-event-category')

const {getRecurringEvents} =require('../event-routes/get-recurring-event')
const {createRecurringEvent} =require('../event-routes/create-recurring-event')

const {getReminders} =require('../event-routes/get-reminder')
const {createReminder} =require('../event-routes/create-reminder')

const {getGuestSpeakers} =require('../event-routes/get-guest-speaker')
const {createGuestSpeaker} =require('../event-routes/create-guest-speaker')

router.use(express.json());

// Endpoints for basic event operations
router.post('/events/create', verifyJwt, validateEventCreate, createEvent);
router.get('/events/get', verifyJwt, getAllEvents);
router.put('/events/edit/:eventId', verifyJwt, validateEventEdit, editEvent);
router.delete('/events/delete/:eventId', verifyJwt, deleteEvent);

// Endpoints for event categories
router.get('/event-categories', verifyJwt, getEventCategories);
router.post('/event-categories/create', verifyJwt, createEventCategory);
router.post('/events/:eventId/categories/assign/:categoryId', verifyJwt, validateAssignEventCategory, assignEventCategory);

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