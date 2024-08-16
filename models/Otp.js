const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const OTP_TABLE = process.env.OTP_TABLE;

const saveOTP = async (email, otp, expiresAt) => {
  const params = {
    TableName: OTP_TABLE,
    Item: {
      email,
      otp,
      expiresAt,
    },
  };
  return dynamoDB.put(params).promise();
};

const getOTP = async (email) => {
  const params = {
    TableName: OTP_TABLE,
    Key: { email },
  };
  return dynamoDB.get(params).promise();
};

module.exports = { saveOTP, getOTP };
