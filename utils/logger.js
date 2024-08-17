const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;
const DailyRotateFile = require("winston-daily-rotate-file");

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const transportOptions = {
  filename: "logs/app-%DATE%.log",
  datePattern: "DD-MM-YYY",
  maxSize: "20m",
  maxFiles: "14d",
};

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    logFormat
  ),
  transports: [new transports.Console(), new DailyRotateFile(transportOptions)],
});

module.exports = logger;
