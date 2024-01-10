import {
  createLogger,
  config,
  format as _format,
  transports as _transports,
} from "winston";
import fs from "fs";
import path from "path";

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = createLogger({
  levels: config.npm.levels,
  format: _format.combine(
    _format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    _format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new _transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880,
    }),
    new _transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new _transports.Console({
      format: _format.combine(
        _format.colorize({ all: true }),
        _format.simple()
      ),
    })
  );
}

export function log(level, message) {
  logger.log({
    level,
    message,
  });
}
