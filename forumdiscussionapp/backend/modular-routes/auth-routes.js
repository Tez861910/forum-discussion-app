import express from "express";

import loginRoutes from "../routes/auth-routes/login-server.js";
import signupRoutes from "../routes/auth-routes/signup-server.js";
import homeRoutes from "../routes/auth-routes/home-server.js";

const router = express.Router();

router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/home", homeRoutes);

export default router;
