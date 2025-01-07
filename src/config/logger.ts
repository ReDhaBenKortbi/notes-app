import path from "path";
import fs from "fs";
import winston from "winston";

const { combine, timestamp, json, errors, colorize, printf, align } =
  winston.format;

// Construct the path to the logs folder
const logsDir = path.resolve(import.meta.dirname, "../../logs");

// Ensure the logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const errorFilter = winston.format((info, opts) => {
  return info.level === "error" ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === "info" ? info : false;
});

const httpFilter = winston.format((info, opts) => {
  return info.level === "http" ? info : false;
});

export const mainLogger = winston.loggers.add("mainLogger", {
  level: process.env.LOG_LEVEL || "info",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "combined.log"),
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "app-error.log"),
      level: "error",
      format: combine(errorFilter(), timestamp(), json()),
    }),
    new winston.transports.File({
      filename: path.join(logsDir, "app-info.log"),
      level: "info",
      format: combine(infoFilter(), timestamp(), json()),
    }),
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({
          format: "YYYY-MM-DD hh:mm:ss A",
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    }),
  ],
});

export const httpLogger = winston.loggers.add("httpLogger", {
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss A",
    }),
    json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "app-http.log"),
      level: "http",
      format: combine(httpFilter(), timestamp(), json()),
    }),
  ],
});
