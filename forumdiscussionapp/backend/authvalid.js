const argon2Utils = require('./utils/argon2Utils');
const jwtUtils = require('./utils/jwtUtils');
const validationMiddleware = require('./utils/validationMiddleware');

const {
  hashPassword,
  verifyPassword,
} = argon2Utils;

const {
  createToken,
  verifyJwt,
  createRefreshToken,
  verifyRefreshToken,
} = jwtUtils;

const {
  validate,
} = validationMiddleware;

module.exports = {
  hashPassword,
  verifyPassword,
  createToken,
  verifyJwt,
  createRefreshToken,
  verifyRefreshToken,
  validate,
};
