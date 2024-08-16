const mongoose = require("mongoose");

const rootAdminSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
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
    role: {
      type: String,
      default: "root_admin",
    },
    permissions: [String],
  },
  { timestamps: true }
);

const RootAdmin = mongoose.model("RootAdmin", rootAdminSchema);

module.exports = RootAdmin;
