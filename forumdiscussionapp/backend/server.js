import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { handleError, CustomError } from './error-handler.js';

import authRoutes from './modular-routes/auth-routes.js';
import userRoutes from './modular-routes/user-routes.js';
import forumRoutes from './modular-routes/forum-routes.js';
import examRoutes from './modular-routes/exam-routes.js';
import messagingRoutes from './modular-routes/messaging-routes.js';
import groupRoutes from './modular-routes/group-chats-routes.js';
import attachmentRoutes from './modular-routes/attachment-routes.js';
import notificationRoutes from './modular-routes/allert-routes.js';
import moderationRoutes from './modular-routes/moderation-routes.js';
import activityRoutes from './modular-routes/activity-routes.js';

const app = express();
const port = 8081;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(compression()); 
app.use(express.json());
app.use(morgan('dev')); 

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/forums', forumRoutes);
app.use('/exams', examRoutes);
app.use('/messages', messagingRoutes);
app.use('/groups', groupRoutes);
app.use('/attachments', attachmentRoutes);
app.use('/notifications', notificationRoutes);
app.use('/moderation', moderationRoutes);
app.use('/activity', activityRoutes);

// Root route
app.get('/', (req, res) => {
  console.log('Received request for the root path.');
  res.status(200).send('Hello, this is the root path!'); 
});

// Error handling middleware
app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
