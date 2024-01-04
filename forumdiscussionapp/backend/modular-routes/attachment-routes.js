import express from 'express';
import { handleError } from '../error-handler.js';

import attachmenttypesRoutes from '../routes/attachment-routes/attachment-types.js';
import attachmentsRoutes from '../routes/attachment-routes/attachments.js';
import reactiontypesRoutes from '../routes/attachment-routes/reaction-types.js';
import reactionsRoutes from '../routes/attachment-routes/reactions.js';

const router = express.Router();

router.use('/attachmenttypes', attachmenttypesRoutes);
router.use('/attachments', attachmentsRoutes);
router.use('/reactiontypes', reactiontypesRoutes);
router.use('/reactions', reactionsRoutes);

// Error handling middleware
router.use(handleError);

export default router;
