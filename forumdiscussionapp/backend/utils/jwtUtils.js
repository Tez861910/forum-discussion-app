import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

// Use cookie-parser middleware
app.use(cookieParser());

// Function to create an access token and set cookies
export const createTokenAndSetCookies = (userId, email, roleId, res) => {
  const accessToken = jwt.sign(
    { userId, email, roleId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRATION,
    }
  );

  // Set cookies for the new access token
  res.cookie("token", accessToken, { httpOnly: true });

  return accessToken;
};

// Function to create a refresh token and set cookies
export const createRefreshTokenAndSetCookies = (userId, email, roleId, res) => {
  const refreshToken = jwt.sign(
    { userId, email, roleId },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    }
  );

  // Set cookies for the new refresh token
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  return refreshToken;
};

// Middleware to verify JWT in request cookies
export const verifyJwt = (req, res, next) => {
  const authToken = req.cookies.token;

  if (authToken) {
    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return handleJwtVerificationError(err, res);
      }

      if (!decoded?.userId || !decoded?.roleId) {
        console.log("Invalid token contents");
        return res.status(401).json({ error: "Invalid token contents" });
      }

      req.roleId = decoded.roleId;
      req.userId = decoded.userId;
      next();
    });
  } else {
    next();
  }
};

// Middleware to verify and refresh the refresh token
export const verifyRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = createToken(
      decoded.userId,
      decoded.email,
      decoded.roleId,
      res
    );

    // Create and set cookies for the new refresh token
    const newRefreshToken = createRefreshToken(
      decoded.userId,
      decoded.email,
      decoded.roleId,
      res
    );

    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Refresh token verification error:", error);
    return res.sendStatus(403);
  }
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
