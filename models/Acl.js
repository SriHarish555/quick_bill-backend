const mongoose = require("mongoose");

const acl = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ROOT_ADMI", "LEAD_ADMIN", "USER"],
      required: true,
    },
    permissions: {
      type: [String],
      enum: [
        "CREATE_LEAD_ADMIN",
        "EDIT_ACL",
        "CREATE_ORDER",
        "UPDATE_ORDER",
        "DELETE_ORDER",
        "VIEW_ORDER",
        "MANAGE_USERS",
        "MANAGE_CATEGORIES",
        "MANAGE_ITEMS",
      ],
      requireed: true,
    },
  },
  { timestamps: true }
);

const aclSchema = mongoose.model("ACL", acl);
module.exports = aclSchema;
