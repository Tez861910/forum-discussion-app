const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../../authvalid');
const {
  validateCreateRecurringEvent,
  validateEditRecurringEvent,
  validateSoftDeleteRecurringEvent,
} = require('../../body-validation/recurring-event-validation'); 

const {getRecurringEvents} =require('../../route-files/recurring-event-routes/get-recurring-event')
const {createRecurringEvent} =require('../../route-files/recurring-event-routes/create-recurring-event')
const {editRecurringEvent} =require('../../route-files/recurring-event-routes/edit-recurring-event')
const {softDeleteRecurringEvent} =require('../../route-files/recurring-event-routes/delete-recurring-event')

router.use(express.json());

// Endpoint to get recurring events for an event
router.get('/:eventId/recurring', verifyJwt, getRecurringEvents);

// Endpoint to create a new recurring event for an event
router.post('/:eventId/recurring/create', verifyJwt, validateCreateRecurringEvent, createRecurringEvent);

// Endpoint to edit an existing recurring event
router.put('/:eventId/recurring/edit/:recurringEventId', verifyJwt, validateEditRecurringEvent, editRecurringEvent);

// Endpoint to soft delete a recurring event
router.delete('/:eventId/recurring/soft-delete/:recurringEventId', verifyJwt, validateSoftDeleteRecurringEvent, softDeleteRecurringEvent);

module.exports = router;