const mongoose = require("mongoose");
const { Permissions } = require("../utils/enum");

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
        Permissions.CREATE_LEAD_ADMIN,
        Permissions.CREATE_ORDER,
        Permissions.CREATE_ROOT_ADMIN,
        Permissions.DELETE_ORDER,
        Permissions.EDIT_ACL,
        Permissions.MANAGE_CATEGORIES,
        Permissions.MANAGE_ITEMS,
        Permissions.UPDATE_ORDER,
        Permissions.UPDATE_ORDER,
        Permissions.VIEW_ORDER,
        Permissions.MANAGE_USERS,
      ],
      requireed: true,
    },
  },
  { timestamps: true }
);

const aclSchema = mongoose.model("acls", acl);
module.exports = aclSchema;
