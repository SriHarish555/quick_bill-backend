const { superAdminSchema } = require("../validators/adminValidator");
const SuperAdmin = require("../models/SuperAdmin");
const bcrypt = require("bcrypt");
const {
  DynamoDBClient,
  DeleteItemCommand,
  GetItemCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  generateAccessToken,
  generateRefreshToken,
  storeDynamoDB,
} = require("../utils/generateToken");

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

async function createSuperAdmin(req, res) {
  const { error } = superAdminSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    const { name, email, pwd, adminId } = req.body;

    const getParams = {
      TableName: "otp",
      Key: {
        email: { S: email },
      },
    };
    const response = await client.send(new GetItemCommand(getParams));
    if (!response.Item || !response.Item.verified.BOOL) {
      return res.json({ status: "err", msg: "failed creating user" });
    }

    const params = {
      TableName: "otp",
      Key: {
        email: { S: email },
      },
    };
    await client.send(new DeleteItemCommand(params));

    const password = await bcrypt.hash(pwd, 10);
    const newSuperAdmin = new SuperAdmin({
      name,
      email,
      adminId,
      pwd: password,
    });
    const data = await newSuperAdmin.save();
    const info = { _id: data._id, adminId: data.adminId, role: data.role };
    const accessToken = generateAccessToken(info);
    const refreshToken = generateRefreshToken(data._id);
    storeDynamoDB(refreshToken, accessToken, adminId, "admin");

    res.status(201).json({
      msg: "Super Admin created successfully",
      tokens: { accessToken: accessToken, refreshToken: refreshToken },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

module.exports = { createSuperAdmin };
