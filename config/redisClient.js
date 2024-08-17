const { createClient } = require("redis");
require("dotenv").config();
const logger = require("../utils/logger");

const client = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => {
  logger.error(`"Redis Client Error", err`);
});

(async () => {
  const log = await client.connect();
  logger.info(`redis connected`);
})();

module.exports = client;
