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

function accessToken(userId, email, roleId) {
  return jwt.sign({ userId, email, roleId }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyJwt(req, res, next) {
  const token = req.headers['authorization'];
  console.log('Received token:', token);

  if (!token || !token.startsWith('Bearer ')) {
    console.log('Invalid token format');
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const tokenWithoutBearer = token.slice('Bearer '.length);

  jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, decoded) => {
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

    if (!decoded || !decoded.userId || !decoded.roleId) {
      console.log('Invalid token contents');
      return res.status(401).json({ error: 'Invalid token contents' });
    }

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
  accessToken,
};
