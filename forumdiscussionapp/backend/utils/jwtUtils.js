import jwt from "jsonwebtoken";

export const createToken = (userId, email, roleId) => {
  const token = jwt.sign({ userId, email, roleId }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
  console.log("Token created");
  return token;
};

export const createRefreshToken = (userId, email, roleId, refreshTokens) => {
  const refreshToken = jwt.sign(
    { userId, email, roleId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  );
  refreshTokens.push(refreshToken);
  console.log("Refresh token created");
  return refreshToken;
};

export const verifyJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Received auth header:", authHeader);

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice("Bearer ".length);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        handleJwtVerificationError(err, res);
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

export const verifyRefreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken && refreshTokens.includes(refreshToken)) {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error("Refresh token verification error:", err);
        return res.sendStatus(403);
      }
      const accessToken = createToken(
        decoded.userId,
        decoded.email,
        decoded.roleId
      );
      return res.json({ accessToken });
    });
  } else {
    return res.sendStatus(403);
  }
};

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
