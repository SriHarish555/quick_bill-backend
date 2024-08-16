const express = require("express");
const router = express.Router();
const { createSuperAdmin } = require("./admin");
const { generateOTP, verifyOTP } = require("../utils/generateOTP");
const { mailSchema } = require("../validators/adminValidator");
const SuperAdmin = require("../models/SuperAdmin");

const verify = async (req, res, next) => {
  const { error } = mailSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { mail } = req.body;
  const superAdminExists = await SuperAdmin.findOne();
  if (superAdminExists) {
    return res.status(400).json({ msg: "Super Admin already exists" });
  }
  next();
};

router.post("/admin", verify, createSuperAdmin);
router.post("/otp/generate", verify, generateOTP);
router.post("/otp/verify", verify, verifyOTP);

module.exports = router;
