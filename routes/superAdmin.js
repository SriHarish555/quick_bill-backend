const express = require("express");
const router = express.Router();
const { createSuperAdmin, createRootAdmin } = require("./admin");
const { generateOTP, verifyOTP } = require("../utils/generateOTP");
const { mailSchema } = require("../validators/adminValidator");
const SuperAdmin = require("../models/SuperAdmin");
const AdminVerifyMiddleware = require("../middlewares/verifyMiddleware");

const verify = async (req, res, next) => {
  const { error } = mailSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const superAdminExists = await SuperAdmin.findOne();
  if (superAdminExists) {
    return res.status(400).json({ msg: "Super Admin already exists" });
  }
  next();
};

router.post("/admin/register", verify, createSuperAdmin);
router.post("/otp/generate", verify, generateOTP);
router.post("/otp/verify", verify, verifyOTP);
router.post(
  "/admin/create",
  require("../middlewares/checkSuperAdmin"),
  AdminVerifyMiddleware,
  createRootAdmin
);

module.exports = router;
