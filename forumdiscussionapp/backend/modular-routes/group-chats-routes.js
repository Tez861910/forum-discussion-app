import express from 'express';
import { handleError } from '../error-handler.js';

import groupchatsRoutes from '../routes/group-chats-routes/group-chats.js';
import groupmanagersRoutes from '../routes/group-chats-routes/group-managers.js';
import groupmembersRoutes from '../routes/group-chats-routes/group-members.js';
import groupmessagesRoutes from '../routes/group-chats-routes/group-messages.js';
import readreceiptgroupsRoutes from '../routes/group-chats-routes/read-receipts-group.js';
import realtimegroupupdatesRoutes from '../routes/group-chats-routes/real-time-group-updates.js';

const router = express.Router();

router.use('/groupchats', groupchatsRoutes);
router.use('/groupmanagers', groupmanagersRoutes);
router.use('/groupmembers', groupmembersRoutes);
router.use('/groupmessages', groupmessagesRoutes);
router.use('/readreceiptgroups', readreceiptgroupsRoutes);
router.use('/realtimegroupupdates', realtimegroupupdatesRoutes);

// Error handling middleware
router.use(handleError);

export default router;
