const express = require('express');
const router = express.Router();
const { verifyJwt } = require('../../authvalid');
const {
  validateCreateGuestSpeaker,
  validateEditGuestSpeaker,
  validateSoftDeleteGuestSpeaker,
} = require('../../body-validation/guest-speaker-validation')

const {getGuestSpeakers} =require('../../route-files/guest-speaker-routes/get-guest-speaker')
const {createGuestSpeaker} =require('../../route-files/guest-speaker-routes/create-guest-speaker')
const {editGuestSpeaker} =require('../../route-files/guest-speaker-routes/edit-guest-speaker')
const {softDeleteGuestSpeaker} =require('../../route-files/guest-speaker-routes/delete-guest-speaker')

router.use(express.json());

// Endpoint to get guest speakers for an event
router.get('/:eventId/guest-speakers/get', verifyJwt, getGuestSpeakers);

// Endpoint to create a new guest speaker for an event
router.post('/:eventId/guest-speakers/create', verifyJwt, validateCreateGuestSpeaker, createGuestSpeaker);

// Endpoint to edit an existing guest speaker
router.put('/:eventId/guest-speakers/edit/:guestSpeakerId', verifyJwt, validateEditGuestSpeaker, editGuestSpeaker);

// Endpoint to soft delete a guest speaker
router.delete('/:eventId/guest-speakers/soft-delete/:guestSpeakerId', verifyJwt, validateSoftDeleteGuestSpeaker, softDeleteGuestSpeaker);

module.exports = router;
