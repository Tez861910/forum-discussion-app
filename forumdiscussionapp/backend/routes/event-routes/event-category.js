import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateCreateEventCategory,
  validateEditEventCategory,
  validateAssignEventCategory,
  validateEditAssignedEventCategory,
} from '../../body-validation/event-validation-functions/event-category-validation.js';

import {createEventCategory} from '../../route-files/event-function-routes/event-category-routes/create-event-category.js';
import {getEventCategories} from '../../route-files/event-function-routes/event-category-routes/get-event-categories.js';
import {editEventCategory} from '../../route-files/event-function-routes/event-category-routes/edit-event-category.js';
import {softDeleteEventCategory} from '../../route-files/event-function-routes/event-category-routes/delete-event-category.js';
import {assignEventCategory} from '../../route-files/event-function-routes/event-category-routes/assign-event-category.js';
import {editAssignedEventCategory} from '../../route-files/event-function-routes/event-category-routes/edit-assigned-event-category.js';
import {softDeleteAssignedEventCategory} from '../../route-files/event-function-routes/event-category-routes/delete-assigned-event-category.js';

const router = express.Router();

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

export default router;
