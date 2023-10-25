const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8081;

console.log('Setting up middleware...');

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

console.log('Middleware setup complete.');

console.log('Setting up database connection...');
const db = require('./db'); 
console.log('Database connection setup complete.');

console.log('Importing JWT and password hashing functions...');
const { createToken, verifyJwt, hashPassword, verifyPassword } = require('./authvalid');
console.log('JWT and password hashing functions imported successfully.');

console.log('Importing route handlers...');
const usersRoutes = require('./routes/users');
const coursesRoutes = require('./routes/courses');
const rolesRoutes = require('./routes/roles');
const authRoutes = require('./routes/auth');
const threadsRoutes = require('./routes/threads');
console.log('Route handlers imported successfully.');

console.log('Setting up routes...');
app.use('/users', usersRoutes);
app.use('/courses', coursesRoutes);
app.use('/roles', rolesRoutes);
app.use('/auth', authRoutes);
app.use('/threads', threadsRoutes);

app.get('/checkauth', verifyJwt, (req, res) => {
  console.log('Authentication check successful.');
  return res.json('Authenticated');
});

app.get('/', (req, res) => {
  console.log('Received request for root path.');
  res.send('Hello, this is the root path!');
});

console.log(`Starting server on port ${PORT}...`);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
