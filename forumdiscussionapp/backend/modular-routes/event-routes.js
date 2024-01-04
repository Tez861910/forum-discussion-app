import express from 'express';
import { handleError } from '../error-handler.js';

import eventsRoutes from '../routes/event-routes/events.js';
import eventscategoryRoutes from '../routes/event-routes/event-category.js';
import recurringeventsRoutes from '../routes/event-routes/recurring-events.js';
import remindersRoutes from '../routes/event-routes/reminders.js';
import guestspeakersRoutes from '../routes/event-routes/guest-speaker.js';
import eventimagesRoutes from '../routes/event-routes/event-images.js';

const router = express.Router();

router.use('/events', eventsRoutes);
router.use('/eventscategorys', eventscategoryRoutes);
router.use('/recurringevents', recurringeventsRoutes);
router.use('/reminders', remindersRoutes);
router.use('/guestspeakers', guestspeakersRoutes);
router.use('/eventimages', eventimagesRoutes);

// Error handling middleware
router.use(handleError);

export default router;
