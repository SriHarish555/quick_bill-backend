const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const superAdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    adminId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pwd: {
      type: String,
      required: true,
    },
    acl: {
      type: Schema.Types.ObjectId,
      ref: "acls",
      required: true,
    },
  },
  { timestamps: true }
);

//!Triggers
superAdminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("pwd")) {
      return next();
    }
    const hashedPwd = await bcrypt.hash(this.pwd, 10);
    this.pwd = hashedPwd;
    next();
  } catch (error) {
    next(error);
  }
});

const SuperAdmin = mongoose.model("superadmins", superAdminSchema);
module.exports = SuperAdmin;
