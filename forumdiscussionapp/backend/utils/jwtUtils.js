import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import express from "express";

const router = express.Router();

// Use cookie-parser middleware
router.use(cookieParser());

// Function to create a token and set cookies
const createTokenAndSetCookies = (
  userId,
  email,
  roleId,
  res,
  secret,
  tokenName,
  expiresIn
) => {
  const token = jwt.sign({ userId, email, roleId }, secret, { expiresIn });

  // Set cookies for the new token
  res.cookie(tokenName, token, { httpOnly: true });

  return token;
};

export const createAccessTokenAndSetCookies = (userId, email, roleId, res) =>
  createTokenAndSetCookies(
    userId,
    email,
    roleId,
    res,
    process.env.JWT_SECRET,
    "token",
    process.env.TOKEN_EXPIRATION
  );

export const createRefreshTokenAndSetCookies = (userId, email, roleId, res) =>
  createTokenAndSetCookies(
    userId,
    email,
    roleId,
    res,
    process.env.REFRESH_TOKEN_SECRET,
    "refreshToken",
    process.env.REFRESH_TOKEN_EXPIRATION
  );

// Function to verify JWT
const verifyJwtToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

// Middleware to verify JWT in request cookies
export const verifyJwt = (req, res, next) => {
  const authToken = req.cookies.token;

  if (authToken) {
    const decoded = verifyJwtToken(authToken, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId || !decoded.roleId) {
      console.log("Invalid token contents");
      return res.status(401).json({ error: "Invalid token contents" });
    }

    req.roleId = decoded.roleId;
    req.userId = decoded.userId;
  }

  next();
};

// Middleware to verify and refresh the refresh token
export const verifyRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  const decoded = verifyJwtToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decoded) {
    console.error("Refresh token verification error");
    return res.sendStatus(403);
  }

  const accessToken = createAccessTokenAndSetCookies(
    decoded.userId,
    decoded.email,
    decoded.roleId,
    res
  );

  // Create and set cookies for the new refresh token
  const newRefreshToken = createRefreshTokenAndSetCookies(
    decoded.userId,
    decoded.email,
    decoded.roleId,
    res
  );

  return res.json({ accessToken, refreshToken: newRefreshToken });
};

// Function to handle JWT verification errors
export const handleJwtVerificationError = (err, res) => {
  const errorResponse = (statusCode, message) =>
    res.status(statusCode).json({ error: message });

  if (err.name === "TokenExpiredError") {
    console.log("Token expired");
    return errorResponse(401, "Token expired");
  } else if (err.name === "JsonWebTokenError") {
    console.log("Invalid token");
    return errorResponse(401, "Invalid token");
  } else {
    console.error("JWT verification error:", err);
    return errorResponse(500, "Internal server error");
  }
};
