import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import winston from "winston";
import dotenv from "dotenv";
import "express-async-errors";
import { handleError } from "./authvalid.js";

dotenv.config();

import authRoutes from "./modular-routes/auth-routes.js";
import usersRoutes from "./modular-routes/user-routes.js";
import forumsRoutes from "./modular-routes/forum-routes.js";
import examsRoutes from "./modular-routes/exam-routes.js";
import messagingRoutes from "./modular-routes/messaging-routes.js";
import groupsRoutes from "./modular-routes/group-chats-routes.js";
import accessoriesRoutes from "./modular-routes/accessories-routes.js";
import alertsRoutes from "./modular-routes/alert-routes.js";
import moderationRoutes from "./modular-routes/moderation-routes.js";
import activityRoutes from "./modular-routes/activity-routes.js";

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};

// Logger configuration
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// Middleware setup
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/forums", forumsRoutes);
app.use("/exams", examsRoutes);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
