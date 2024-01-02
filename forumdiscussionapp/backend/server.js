const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { handleError } = require('./ErrorHandler');

const app = express();
const port = 8081;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Import route handlers
const loginRoutes = require('./routes/loginserver');
const signupRoutes = require('./routes/signup');
const homeRoutes = require('./routes/homeserver');

const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const rolesRoutes = require('./routes/roles');

const forumsRoutes = require('./routes/forum');
const threadsRoutes = require('./routes/threads');
const commentsRoutes = require('./routes/comments');
const responseRoutes = require('./routes/response');
const postsRoutes = require('./routes/posts');
const replyRoutes = require('./routes/reply');
const pollsRoutes = require('./routes/polls');
const optionsRoutes = require('./routes/options');
const uservotesRoutes = require('./routes/user-votes');
const moderatorRoutes = require('./routes/moderators');

const examsRoutes = require('./routes/exams');
const questiontypesRoutes = require('./routes/questiontypes');
const questionsRoutes = require('./routes/questions');
const mcqoptionsRoutes = require('./routes/mcq-options');
const answersRoutes = require('./routes/answers');
const userresponsesRoutes = require('./routes/user-responses');

const eventsRoutes = require('./routes/events');
const eventscategoryRoutes = require('./routes/event-category');
const recurringeventsRoutes = require('./routes/recurring-events');
const remindersRoutes = require('./routes/reminders');
const guestspeakersRoutes = require('./routes/guest-speaker');

const privatemessagesRoutes = require('./routes/privatemessages');
const groupchatsRoutes = require('./routes/groupchats');
const groupmembersRoutes = require('./routes/groupmembers');
const groupmessagesRoutes = require('./routes/groupmessages');


// Routes
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/home', homeRoutes);

app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);
app.use('/roles', rolesRoutes);

app.use('/forums', forumsRoutes);
app.use('/threads', threadsRoutes);
app.use('/comments', commentsRoutes);
app.use('/responses', responseRoutes);
app.use('/posts', postsRoutes);
app.use('/reply', replyRoutes);
app.use('/polls', pollsRoutes);
app.use('/options', optionsRoutes);
app.use('/uservotes', uservotesRoutes);
app.use('/moderators', moderatorRoutes);

app.use('/exams', examsRoutes);
app.use('/questiontypes', questiontypesRoutes);
app.use('/questions', questionsRoutes);
app.use('/mcqoptions', mcqoptionsRoutes);
app.use('/answers', answersRoutes);
app.use('/userresponses', userresponsesRoutes);

app.use('/events', eventsRoutes);
app.use('/eventscategorys', eventscategoryRoutes);
app.use('/recurringevents', recurringeventsRoutes);
app.use('/reminders', remindersRoutes);
app.use('/guestspeakers', guestspeakersRoutes);

app.use('/privatemessages', privatemessagesRoutes);
app.use('/groupchats', groupchatsRoutes);
app.use('/groupmembers', groupmembersRoutes);
app.use('/groupmessages', groupmessagesRoutes);

// Root route
app.get('/', (req, res) => {
  console.log('Received request for root path.');
  res.send('Hello, this is the root path!');
});


// Error handling middleware
app.use(handleError);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
