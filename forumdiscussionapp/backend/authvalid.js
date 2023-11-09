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

function createToken(userId, email, roleId) {
  const token = jwt.sign(
    { userId, email, roleId },
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
    console.log('Decoded token:', decoded);

    req.roleId = decoded.roleId;
    req.userId = decoded.userId;
    next();
  });
}

module.exports = {
  hashPassword,
  verifyPassword,
  createToken,
  verifyJwt,
};
