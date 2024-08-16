const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema(
  {
    username: {
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
    role: {
      type: String,
      default: "super_admin",
    },
  },
  { timestamps: true }
);

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);

module.exports = SuperAdmin;
