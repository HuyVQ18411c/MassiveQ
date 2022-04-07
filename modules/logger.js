const winston = require("winston");
const path = require("path");

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.colorize(),
    winston.format.printf((log) => {
      // nếu log là error hiển thị stack trace còn không hiển thị message của log
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    })
  ),
  transports: [
    // Thiết lập ghi các errors vào file
    new winston.transports.Console(),
    new winston.transports.File({
      level: "error",
      filename: path.join(__dirname, "../logs/errors.log"),
    }),

    new winston.transports.File({
      level: "info",
      filename: path.join(__dirname, "../logs/info.log"),
    }),
  ],
});
