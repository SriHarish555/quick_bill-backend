const jwt = require("jsonwebtoken");
const redisClient = require("../config/redisClient");
require("dotenv").config();

const AdminVerifyMiddleware = async (req, res, next) => {
  try {
    const AccessToken = req.headers?.authorization?.split(" ")[1];

    if (!AccessToken) {
      return res.json({ message: "Failed", error: "Illegal Access" });
    }

    jwt.verify(
      AccessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, info) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Failed", error: "jwt expired" });
        }

        const isTokenStored = await redisClient.exists(
          `AC_Token:${info.adminId}`
        );

        if (!isTokenStored) {
          return res.status(401).json({ message: "Invalid or expired token" });
        }

        req._id = info._id;
        req.aclId = info.aclId;
        next();
      }
    );
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = AdminVerifyMiddleware;
