const express = require("express");
const router = express.Router();
const { generateOTP, verifyOTP } = require("../utils/otp");

router.post("/", generateOTP);
router.post("/verify", verifyOTP);

module.exports = router;
