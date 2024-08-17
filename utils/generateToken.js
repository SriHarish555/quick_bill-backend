const jwt = require("jsonwebtoken");
const redisClient = require("../config/redisClient");

require("dotenv").config();

const generateAccessToken = async (info, id) => {
  const token = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10d",
  });

  const key = `AC_Token:${id}`;
  await redisClient.set(key, token, {
    EX: 864000,
  });
  return token;
};

const generateRefreshToken = async (userId, id) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  const key = `RF_Token:${id}`;
  await redisClient.set(key, token, {
    EX: 2592000,
  });
  return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
