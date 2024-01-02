const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../authvalid');
const {
    validateAssignEventCategory,
  } = require('../body-validation/event-validation');

const {createEventCategory} =require('../event-routes/create-event-category')
const {getEventCategories} =require('../event-routes/get-event-categories')
const {editEventCategory} =require('../event-routes/edit-event-category')
const {softDeleteEventCategory} =require('../event-routes/delete-event-category')
const {assignEventCategory} =require('../event-routes/assign-event-category')
const {editAssignedEventCategory} =require('../event-routes/edit-assigned-event-category')
const {softDeleteAssignedEventCategory} =require('../event-routes/delete-assigned-event-category')

router.use(express.json());

// Endpoint to get all event categories
router.get('/event-categories', verifyJwt, getEventCategories);

// Endpoint to create a new event category
router.post('/event-categories/create', verifyJwt, createEventCategory);

// Endpoint to edit an existing event category
router.put('/event-categories/edit/:categoryId', verifyJwt, editEventCategory);

// Endpoint to soft delete an event category
router.delete('/event-categories/soft-delete/:categoryId', verifyJwt, softDeleteEventCategory);

// Endpoint to assign an event category to an event
router.post('/events/:eventId/categories/assign/:categoryId', verifyJwt, validateAssignEventCategory, assignEventCategory);

// Endpoint to edit an assigned event category
router.put('/events/:eventId/categories/edit/:categoryId', verifyJwt, editAssignedEventCategory);

// Endpoint to soft delete an assigned event category
router.delete('/events/:eventId/categories/soft-delete/:categoryId', verifyJwt, softDeleteAssignedEventCategory);

module.exports = router;