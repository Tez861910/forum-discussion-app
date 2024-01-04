import * as argon2Utils from './utils/argon2Utils.js';
import * as jwtUtils from './utils/jwtUtils.js';
import * as validationMiddleware from './utils/validationMiddleware.js';

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

export {
  hashPassword,
  verifyPassword,
  createToken,
  verifyJwt,
  createRefreshToken,
  verifyRefreshToken,
  validate,
};
