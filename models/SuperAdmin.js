const mongoose = require("mongoose");
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

const SuperAdmin = mongoose.model("superadmins", superAdminSchema);

module.exports = SuperAdmin;
