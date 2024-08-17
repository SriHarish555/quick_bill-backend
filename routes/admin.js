const { superAdminSchema } = require("../validators/adminValidator");
const SuperAdmin = require("../models/SuperAdmin");
const acl = require("../models/Acl");
const bcrypt = require("bcrypt");
const redisClient = require("../config/redisClient");
const logger = require("../utils/logger");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

async function createSuperAdmin(req, res) {
  const { error } = superAdminSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    const { name, email, pwd, adminId } = req.body;
    const key = `otp:${email}`;
    const status = await redisClient.sendCommand(["HGET", key, "verified"]);

    if (status != "true") {
      return res.json({ status: "err", msg: "failed creating user" });
    }

    await redisClient.sendCommand(["DEL", key]);

    const superAdminACL = new acl({
      role: "SUPER_ADMIN",
      permissions: ["CREATE_LEAD_ADMIN", "EDIT_ACL", "MANAGE_USERS"],
    });
    await superAdminACL.save();

    const password = await bcrypt.hash(pwd, 10);
    const newSuperAdmin = new SuperAdmin({
      name,
      email,
      adminId,
      pwd: password,
      acl: superAdminACL._id,
    });
    const data = await newSuperAdmin.save();
    const info = { _id: data._id, adminId: data.adminId, role: data.role };
    const accessToken = await generateAccessToken(info, adminId);
    const refreshToken = await generateRefreshToken(data._id, adminId, "admin");

    logger.info(`Super Admin created successfully`);

    res.status(201).json({
      msg: "Super Admin created successfully",
      tokens: { accessToken: accessToken, refreshToken: refreshToken },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

module.exports = { createSuperAdmin };
