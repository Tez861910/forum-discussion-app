import express from 'express';
import { handleError } from '../authvalid.js';

import attachmenttypesRoutes from '../routes/accessories-routes/attachment-types.js';
import attachmentsRoutes from '../routes/accessories-routes/attachments.js';
import reactiontypesRoutes from '../routes/accessories-routes/reaction-types.js';
import reactionsRoutes from '../routes/accessories-routes/reactions.js';

const router = express.Router();

router.use('/attachmenttypes', attachmenttypesRoutes);
router.use('/attachments', attachmentsRoutes);
router.use('/reactiontypes', reactiontypesRoutes);
router.use('/reactions', reactionsRoutes);

// Error handling middleware
router.use(handleError);

export default router;
