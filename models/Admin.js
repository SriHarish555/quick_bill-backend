const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
      default: "admin",
    },
    admin_type: {
      type: String,
      enum: ["CategoryAdmin", "OrderAdmin", "UserAdmin"],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RootAdmin",
      required: true,
    },
    permissions: [String],
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
