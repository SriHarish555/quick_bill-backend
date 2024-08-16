const connectDB = require("./config/db");
const express = require("express");
const app = express();
require("dotenv").config();

//?Middleware

app.use(express.json());
app.use("/super", require("./routes/superAdmin"));
app.use(require("./middlewares/checkSuperAdmin"));

app.get("/usr", async (req, res) => {
  res.send("Success");
});

try {
  connectDB().then(() =>
    app.listen(process.env.PORT, () => {
      console.debug("server started", process.env.PORT);
    })
  );
} catch (e) {
  console.debug("Err starting server ", e);
}

//!Err Handlers
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Shutting down gracefully...");
  server.close(() => {
    console.log("Process terminated");
  });
});
