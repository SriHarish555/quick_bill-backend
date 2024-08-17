const {
  superAdminSchema,
  rootAdminSchema,
} = require("../validators/adminValidator");
const SuperAdmin = require("../models/SuperAdmin");
const acl = require("../models/Acl");
const bcrypt = require("bcrypt");
const redisClient = require("../config/redisClient");
const logger = require("../utils/logger");
const { Roles, Permissions } = require("../utils/enum");
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
      role: Roles.SUPER_ADMIN,
      permissions: [
        Permissions.CREATE_LEAD_ADMIN,
        Permissions.EDIT_ACL,
        Permissions.MANAGE_USERS,
        Permissions.CREATE_ROOT_ADMIN,
      ],
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
    const info = {
      _id: data._id,
      adminId: data.adminId,
      role: data.role,
      aclId: superAdminACL._id,
    };
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

const createRootAdmin = (req, res) => {
  const { error } = rootAdminSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  try {
    const aclId = req.aclId;
    if (!aclId) {
      res.json({ status: "err", msg: "unknown server err" });
    }
    console.log(req.body, aclId);
    res.send("received");
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = { createSuperAdmin, createRootAdmin };
