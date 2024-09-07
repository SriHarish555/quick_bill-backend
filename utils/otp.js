const otpGenerator = require("otp-generator");
const { mailSchema, otpSchema } = require("../validators/adminValidator");
const redisClient = require("../config/redisClient");
const { transporter, mailOptions } = require("../config/mailer");

require("dotenv").config();

const generateOTP = async (req, res) => {
  const { error } = mailSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  try {
    const { email } = req.body;
    const key = `otp:${email}`;

    const otpExists = await redisClient.sendCommand(["HEXISTS", key, "otp"]);

    if (otpExists === 1) {
      const otpCreatedAt = await redisClient.sendCommand([
        "HGET",
        key,
        "otpCreatedAt",
      ]);
      const currentTime = Date.now();
      const elapsedTime = (currentTime - otpCreatedAt) / 1000;

      if (elapsedTime < 60) {
        return res.status(400).json({
          message: `Please wait ${
            60 - Math.round(elapsedTime)
          } seconds before requesting a new OTP.`,
        });
      }
    }

    const otp = otpGenerator.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await redisClient.sendCommand([
      "HSET",
      key,
      "otp",
      otp,
      "verified",
      "false",
      "otpCreatedAt",
      Date.now().toString(),
    ]);

    await redisClient.expire(key, 300);

    transporter.sendMail(mailOptions(otp, email), (error, info) => {
      if (error) {
        res.json({ status: "failed", msg: "Failed to send Otp" });
        return console.log(error);
      }
      res.json({ status: "success", msg: "otp send successfully" });
      console.log("Email sent: " + info.response);
    });
  } catch (err) {
    console.debug("err", err);
    res.json({ status: "err", msg: err });
  }
};

const verifyOTP = async (req, res) => {
  const { error } = otpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  const { email, otp } = req.body;
  try {
    const key = `otp:${email}`;

    const storedOtp = await redisClient.sendCommand(["HGET", key, "otp"]);

    if (!storedOtp) {
      return res.json({ status: "failed", msg: "Opt expired " });
    }
    if (storedOtp != otp) {
      return res.json({ status: "err", msg: "failed verifying" });
    }

    await redisClient.sendCommand(["HSET", key, "verified", "true"]);

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.debug("err", err);
    res.json({ status: "err", msg: err });
  }
};

module.exports = { generateOTP, verifyOTP };
