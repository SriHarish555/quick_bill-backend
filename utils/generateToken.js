const jwt = require("jsonwebtoken");
const {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
require("dotenv").config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

const generateAccessToken = (info) => {
  const token = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10d",
  });
  return token;
};

const generateRefreshToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

const storeDynamoDB = async (refreshToken, accessToken, userId, type) => {
  try {
    const storeParams = {
      TableName: "tokens",
      Item: {
        userId: { S: userId },
        refreshToken: { S: refreshToken },
        accessToken: { S: accessToken },
        type: { S: type },
        createdAt: { S: new Date().toISOString() },
      },
    };
    await client.send(new PutItemCommand(storeParams));
  } catch (err) {
    console.debug("err in storing tokens");
  }
};

module.exports = { generateAccessToken, generateRefreshToken, storeDynamoDB };
