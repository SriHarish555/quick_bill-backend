const otpGenerator = require("otp-generator");
const { mailSchema, otpSchema } = require("../validators/adminValidator");
const {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { transporter, mailOptions } = require("../config/mailer");

require("dotenv").config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

const generateOTP = async (req, res) => {
  const { error } = mailSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }
  try {
    const { email } = req.body;
    const expire_at = Math.floor((new Date().getTime() + 2 * 60 * 1000) / 1000);

    const otp = otpGenerator.generate(4, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const storeParams = {
      TableName: "otp",
      Item: {
        email: { S: email },
        otp: { S: otp },
        createdAt: { S: new Date().toISOString() },
        expiresAt: { N: expire_at.toString() },
      },
    };

    await client.send(new PutItemCommand(storeParams));
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
    const getParams = {
      TableName: "otp",
      Key: {
        email: { S: email },
      },
    };

    const data = await client.send(new GetItemCommand(getParams));

    if (!data.Item) {
      return res.json({ status: "failed", msg: "Opt expired " });
    }
    const storedOtp = data.Item.otp.S;
    if (storedOtp != otp) {
      return res.json({ status: "err", msg: "failed verifying" });
    }

    const params = {
      TableName: "otp",
      Key: {
        email: { S: email },
      },
      UpdateExpression: "SET #verified = :verified",
      ExpressionAttributeNames: {
        "#verified": "verified",
      },
      ExpressionAttributeValues: {
        ":verified": { BOOL: true },
      },
    };

    const response = await client.send(new UpdateItemCommand(params));

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.debug("err", err);
    res.json({ status: "err", msg: err });
  }
};

module.exports = { generateOTP, verifyOTP };
