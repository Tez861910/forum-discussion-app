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
const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const rolesRoutes = require('./routes/roles');
const loginRoutes = require('./routes/loginserver');
const homeRoutes = require('./routes/homeserver');
const signupRoutes = require('./routes/signup');
const threadsRoutes = require('./routes/threads');
const eventsRoutes = require('./routes/events');
const commentsRoutes = require('./routes/comments');
const responseRoutes = require('./routes/response');
const mcqformRoutes = require('./routes/mcqform');
const mcqanswerformRoutes = require('./routes/mcqanswerform');

// Routes
app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);
app.use('/roles', rolesRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/threads', threadsRoutes);
app.use('/comments', commentsRoutes);
app.use('/events', eventsRoutes);
app.use('/responses', responseRoutes);
app.use('/home', homeRoutes);
app.use('/mcqform', mcqformRoutes);
app.use('/mcqanswerform', mcqanswerformRoutes);


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
