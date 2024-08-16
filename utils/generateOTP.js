const otpGenerator = require("otp-generator");
// const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBClient, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

require("dotenv").config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
// const ddbDocClient = DynamoDBDocumentClient.from(client);

const generateOTP = async (req, res) => {
  const command = new ListTablesCommand({});
    const response = await client.send(command);
    console.log('Connection successful. Tables:', response.TableNames);
  const otp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.json({ otp: otp });
};

const verifyOTP = (otp, token) => {
  return otplib.authenticator.check(token, process.env.OTP_SECRET);
};

module.exports = { generateOTP, verifyOTP };
