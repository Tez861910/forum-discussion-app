import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import "express-async-errors";
import { logger, verifyJwt, handleError } from "./authvalid.js";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import config from "./config.js";

const app = express();

dotenv.config();

// Body parser
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = JSON.parse(process.env.CORS_ORIGIN);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new ErrorHandler("Not allowed by CORS", 401));
    }
  },
  methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH,HEAD",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization,Content-Length,X-Requested-With",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(hpp());
app.use(rateLimit({ windowMs: 60 * 60 * 1000, max: 500 }));
app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

// Cookie session setup
app.use(
  cookieSession({
    name: "session",
    keys: [config.JWT_SECRET, config.REFRESH_TOKEN_SECRET],
    cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    },
  })
);

// Middleware to enforce token verification for specific routes
const protectedRoutes = [
  "/miscs",
  "/users",
  "/forums",
  "/exams",
  "/events",
  "/messages",
  "/groups",
  "/accessories",
  "/alerts",
  "/moderation",
  "/activity",
];
app.use((req, res, next) => {
  if (protectedRoutes.includes(req.path)) {
    verifyJwt(req, res, next);
  } else {
    next();
  }
});

import authRoutes from "./modular-routes/auth-routes.js";
import miscRoutes from "./modular-routes/misc.js";
import usersRoutes from "./modular-routes/user-routes.js";
import forumsRoutes from "./modular-routes/forum-routes.js";
import examsRoutes from "./modular-routes/exam-routes.js";
import messagingRoutes from "./modular-routes/messaging-routes.js";
import groupsRoutes from "./modular-routes/group-chats-routes.js";
import accessoriesRoutes from "./modular-routes/accessories-routes.js";
import alertsRoutes from "./modular-routes/alert-routes.js";
import moderationRoutes from "./modular-routes/moderation-routes.js";
import activityRoutes from "./modular-routes/activity-routes.js";
import eventsRoutes from "./modular-routes/event-routes.js";

app.use("/auth", authRoutes);
app.use("/miscs", miscRoutes);
app.use("/users", usersRoutes);
app.use("/forums", forumsRoutes);
app.use("/exams", examsRoutes);
app.use("/events", eventsRoutes);
app.use("/messages", messagingRoutes);
app.use("/groups", groupsRoutes);
app.use("/accessories", accessoriesRoutes);
app.use("/alerts", alertsRoutes);
app.use("/moderation", moderationRoutes);
app.use("/activity", activityRoutes);

// Root route
app.get("/", (req, res) => {
  console.log("Received request for the root path.");
  res.status(200).send("Hello, this is the root path!");
});

// Error handling middleware
app.use(handleError);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
