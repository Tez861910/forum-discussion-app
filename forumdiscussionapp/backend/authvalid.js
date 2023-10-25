const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your-secret-key'; 

async function hashPassword(password) {
  const saltRounds = 10; 
  return await bcrypt.hash(password, saltRounds);
} 


async function verifyPassword(password, hashedPassword) {
  if (!hashedPassword) {
    return false;
  }
  return await bcrypt.compare(password, hashedPassword);
}

function createToken(userID) {
  return jwt.sign({ userID }, 'your-secret-key', { expiresIn: '1h' });
}

function verifyJwt(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      } else {
        console.error('JWT verification error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = { hashPassword, verifyPassword, verifyJwt,createToken  };
