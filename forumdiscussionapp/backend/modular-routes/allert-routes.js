import express from 'express';
import { handleError } from '../error-handler.js';

import announcementsRoutes from '../routes/alert-routes/announcements.js';
import notificationsRoutes from '../routes/alert-routes/notifications.js';

const router = express.Router();

router.use('/announcements', announcementsRoutes);
router.use('/notifications', notificationsRoutes);

// Error handling middleware
router.use(handleError);

export default router;
