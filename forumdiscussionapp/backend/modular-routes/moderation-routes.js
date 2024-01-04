import express from 'express';
import { handleError } from '../error-handler.js';

import bansRoutes from '../routes/moderation-routes/bans.js';
import userreportsRoutes from '../routes/moderation-routes/user-reports.js';

const router = express.Router();

router.use('/bans', bansRoutes);
router.use('/userreports', userreportsRoutes);

// Error handling middleware
router.use(handleError);

export default router;
