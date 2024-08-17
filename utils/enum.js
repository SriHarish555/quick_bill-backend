const Roles = Object.freeze({
  SUPER_ADMIN: "SUPER_ADMIN",
  ROOT_ADMIN: "ROOT_ADMIN",
  LEAD_ADMIN: "LEAD_ADMIN",
  USER: "USER",
});

const Permissions = Object.freeze({
  CREATE_LEAD_ADMIN: "CREATE_LEAD_ADMIN",
  EDIT_ACL: "EDIT_ACL",
  CREATE_ORDER: "CREATE_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",
  DELETE_ORDER: "DELETE_ORDER",
  VIEW_ORDER: "VIEW_ORDER",
  MANAGE_USERS: "MANAGE_USERS",
  MANAGE_CATEGORIES: "MANAGE_CATEGORIES",
  MANAGE_ITEMS: "MANAGE_ITEMS",
});

const OrderType = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
});

const TransactionType = Object.freeze({
  RECHARGE: "RECHARGE",
  ORDER: "ORDER",
});

const TransactionStatus = Object.freeze({
  INITIATED: "INITIATED",
  COMPLETED: "COMPLETED",
  PENDING: "PENDING",
  ERROR: "ERROR",
});

module.exports = {
  Roles,
  Permissions,
  OrderType,
  TransactionType,
  TransactionStatus,
};
