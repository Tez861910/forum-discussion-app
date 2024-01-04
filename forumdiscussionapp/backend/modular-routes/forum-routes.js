import express from 'express';
import { handleError } from '../error-handler.js';

import forumsRoutes from '../routes/forum-routes/forum.js';
import threadsRoutes from '../routes/forum-routes/threads.js';
import commentsRoutes from '../routes/forum-routes/comments.js';
import responseRoutes from '../routes/forum-routes/response.js';
import postsRoutes from '../routes/forum-routes/posts.js';
import replyRoutes from '../routes/forum-routes/reply.js';
import pollsRoutes from '../routes/forum-routes/polls.js';
import optionsRoutes from '../routes/forum-routes/options.js';
import uservotesRoutes from '../routes/forum-routes/user-votes.js';
import moderatorRoutes from '../routes/forum-routes/moderators.js';

const router = express.Router();

router.use('/forums', forumsRoutes);
router.use('/threads', threadsRoutes);
router.use('/comments', commentsRoutes);
router.use('/responses', responseRoutes);
router.use('/posts', postsRoutes);
router.use('/reply', replyRoutes);
router.use('/polls', pollsRoutes);
router.use('/options', optionsRoutes);
router.use('/uservotes', uservotesRoutes);
router.use('/moderators', moderatorRoutes);

// Error handling middleware
router.use(handleError);

export default router;
