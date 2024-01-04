const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../../authvalid');
const {
  validateCreateEventCategory,
  validateEditEventCategory,
  validateAssignEventCategory,
  validateEditAssignedEventCategory,
} = require('../../body-validation/event-category-validation');

const {createEventCategory} =require('../../route-files/event-category-routes/create-event-category')
const {getEventCategories} =require('../../route-files/event-category-routes/get-event-categories')
const {editEventCategory} =require('../../route-files/event-category-routes/edit-event-category')
const {softDeleteEventCategory} =require('../../route-files/event-category-routes/delete-event-category')
const {assignEventCategory} =require('../../route-files/event-category-routes/assign-event-category')
const {editAssignedEventCategory} =require('../../route-files/event-category-routes/edit-assigned-event-category')
const {softDeleteAssignedEventCategory} =require('../../route-files/event-category-routes/delete-assigned-event-category')

router.use(express.json());

// Endpoint to get all event categories
router.get('/get', verifyJwt, getEventCategories);

// Endpoint to create a new event category
router.post('/create', verifyJwt, validateCreateEventCategory, createEventCategory);

// Endpoint to edit an existing event category
router.put('/edit/:categoryId', verifyJwt, validateEditEventCategory, editEventCategory);

// Endpoint to soft delete an event category
router.delete('/soft-delete/:categoryId', verifyJwt, softDeleteEventCategory);

// Endpoint to assign an event category to an event
router.post('/:eventId/categories/assign/:categoryId', verifyJwt, validateAssignEventCategory, assignEventCategory);

// Endpoint to edit an assigned event category
router.put('/:eventId/categories/edit/:categoryId', verifyJwt, validateEditAssignedEventCategory, editAssignedEventCategory);

// Endpoint to soft delete an assigned event category
router.delete('/:eventId/categories/soft-delete/:categoryId', verifyJwt, softDeleteAssignedEventCategory);

module.exports = router;