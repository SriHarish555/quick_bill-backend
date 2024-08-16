const express = require("express");
const router = express.Router();
const { createSuperAdmin } = require("./admin");
const { generateOTP } = require("../utils/generateOTP");

router.post("/admin", createSuperAdmin);
router.post("/otp/generate", generateOTP);

module.exports = router;
