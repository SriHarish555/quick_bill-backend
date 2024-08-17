const { createClient } = require("redis");

const client = createClient({
  password: "cxu4hTsFciwrlha1rSs6VtSrUBROLedu",
  socket: {
    host: "redis-14139.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 14139,
  },
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  const log = await client.connect();
  console.log("redis connected");
})();

module.exports = client;
