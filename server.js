const connectDB = require("./config/db");
const express = require("express");
const app = express();
const logger = require("./utils/logger");
const swaggerDocs = require("./config/swagger");
const otpRoutes = require("./routes/otpRoutes");
const { AdminVerifyMiddleware } = require("./middlewares/checkSuperAdmin");
require("dotenv").config();

//?Middleware
app.set("trust proxy", true);
app.use(express.json());
swaggerDocs(app);
app.use("/otp", otpRoutes);
app.use("/super", require("./routes/superAdminRoutes"));
app.use(AdminVerifyMiddleware);

app.get("/usr", async (req, res) => {
  console.log("ipaddress = ", req.ip);
  res.send("Success");
});

try {
  connectDB().then(() =>
    app.listen(process.env.PORT, () => {
      logger.info(`Server started on port ${process.env.PORT}`);
    })
  );
} catch (e) {
  logger.error(`Error starting server: ${e.message}`);
}

//!Err Handlers
process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`, err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise} - reason: ${reason}`);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received. Shutting down gracefully...");
  server.close(() => {
    logger.info("Process terminated");
  });
});
