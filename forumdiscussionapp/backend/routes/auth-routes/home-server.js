import express from "express";

const router = express.Router();

router.get("/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.json({ success: true });
});

export default router;
