import express from 'express';
import { verifyJwt } from '../../authvalid.js';
import {
  validateCreateGuestSpeaker,
  validateEditGuestSpeaker,
  validateSoftDeleteGuestSpeaker,
} from '../../body-validation/event-validation-functions/guest-speaker-validation.js';

import {getGuestSpeakers} from '../../route-files/event-function-routes/guest-speaker-routes/get-guest-speaker.js';
import {createGuestSpeaker} from '../../route-files/event-function-routes/guest-speaker-routes/create-guest-speaker.js';
import {editGuestSpeaker} from '../../route-files/event-function-routes/guest-speaker-routes/edit-guest-speaker.js';
import {softDeleteGuestSpeaker} from '../../route-files/event-function-routes/guest-speaker-routes/delete-guest-speaker.js';

const router = express.Router();

router.use(express.json());

// Endpoint to get guest speakers for an event
router.get('/:eventId/guest-speakers/get', verifyJwt, getGuestSpeakers);

// Endpoint to create a new guest speaker for an event
router.post('/:eventId/guest-speakers/create', verifyJwt, validateCreateGuestSpeaker, createGuestSpeaker);

// Endpoint to edit an existing guest speaker
router.put('/:eventId/guest-speakers/edit/:guestSpeakerId', verifyJwt, validateEditGuestSpeaker, editGuestSpeaker);

// Endpoint to soft delete a guest speaker
router.delete('/:eventId/guest-speakers/soft-delete/:guestSpeakerId', verifyJwt, validateSoftDeleteGuestSpeaker, softDeleteGuestSpeaker);

export default router;
