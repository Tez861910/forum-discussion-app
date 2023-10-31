const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'fg87234tgf8723gf82g498318u308gn8u';
const SALT_ROUNDS = 10;

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  console.log('Password hashed successfully');
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  if (!hashedPassword) {
    console.log('No hashed password provided for verification');
    return false;
  }
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  console.log('Password verification result:', isPasswordValid);
  return isPasswordValid;
}

function createToken(userId, email, roleId,courseId) {
  const token = jwt.sign(
    { userId, email, roleId,courseId },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  console.log('Token created');
  return token;
}

function verifyJwt(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    console.log('Token not provided');
    return res.status(401).json({ error: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.log('Token expired');
        return res.status(401).json({ error: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        console.log('Invalid token');
        return res.status(401).json({ error: 'Invalid token' });
      } else {
        console.error('JWT verification error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
    req.roleId = decoded.roleId;
    req.courseId = decoded.courseId;
    req.userId = decoded.userId;
  });
}

/* Define authorized roles as objects
const authorizedRoles = {
  admin: { name: 'Admin', description: 'Administrator Role' },
  teacher: { name: 'Teacher', description: 'Teacher Role' },
  student: { name: 'Student', description: 'Student Role' },
};

// Middleware for checking user authorization
const checkAuthorization = (req, res, next) => {
  if (authorizedRoles[req.roleId]) {
    next(); 
  } else {
    res.status(403).json({ error: 'Entry Access denied' });
  }
};

// Middleware for checking authorization and fetching additional data
const checkAuthAndGetData = (req, res, next) => {
  if (authorizedRoles[req.roleId]) {
    const data = {
      content: `${authorizedRoles[req.roleId].name} data`,
      description: authorizedRoles[req.roleId].description,
      roleId: req.roleId,
    };
    res.json(data);
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};*/

// middleware/authMiddleware.js

module.exports = {
  hashPassword,
  verifyPassword,
  verifyJwt,
  createToken,
  //checkAuthorization,
  //checkAuthAndGetData,
};
