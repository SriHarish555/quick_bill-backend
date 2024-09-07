const express = require("express");
const router = express.Router();
const {
  createSuperAdmin,
  createRootAdmin,
} = require("../controllers/superAdminController");

const {
  AdminVerifyMiddleware,
  verify,
} = require("../middlewares/checkSuperAdmin");

router.post("/admin/register", verify, createSuperAdmin);
router.post("/admin/create", AdminVerifyMiddleware, createRootAdmin);

module.exports = router;
