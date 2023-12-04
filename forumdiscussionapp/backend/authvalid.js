const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const JWT_SECRET = 'fg87234tgf8723gf82g498318u308gn8u';
const REFRESH_TOKEN_SECRET = 'urhrhvoihiuvoalvheipaquie83843veibuiev';

let refreshTokens = [];

const hashPassword = async (password) => {
  const hashedPassword = await argon2.hash(password);
  console.log('Password hashed successfully');
  return hashedPassword;
}

const verifyPassword = async (password, hashedPassword) => {
  if (!hashedPassword) {
    console.log('No hashed password provided for verification');
    return false;
  }
  const isPasswordValid = await argon2.verify(hashedPassword, password);
  console.log('Password verification result:', isPasswordValid);
  return isPasswordValid;
}

const createToken = (userId, email, roleId) => {
  const token = jwt.sign(
    { userId, email, roleId },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  console.log('Token created');
  return token;
}

const createRefreshToken = (userId, email, roleId) => {
  const refreshToken = jwt.sign(
    { userId, email, roleId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  refreshTokens.push(refreshToken);
  console.log('Refresh token created');
  return refreshToken;
}

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Received auth header:', authHeader);

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice('Bearer '.length);

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

      if (!decoded || !decoded.userId || !decoded.roleId) {
        console.log('Invalid token contents');
        return res.status(401).json({ error: 'Invalid token contents' });
      }

      req.roleId = decoded.roleId;
      req.userId = decoded.userId;
      next();
    });
  } else {
    next();
  }
};

const verifyRefreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken && refreshTokens.includes(refreshToken)) {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const accessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email, roleId: decoded.roleId },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.json({ accessToken });
    });
  } else {
    return res.sendStatus(403);
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  createToken,
  verifyJwt,
  createRefreshToken,
  verifyRefreshToken,
};
