const SuperAdmin = require("../models/SuperAdmin");
const { mailSchema } = require("../validators/adminValidator");

const AdminVerifyMiddleware = async (req, res, next) => {
  try {
    const superAdmin = await SuperAdmin.findOne();

    if (superAdmin) {
      return next();
    } else {
      return res
        .status(403)
        .send("Super admin has not been created. Access denied.");
    }
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

const verify = async (req, res, next) => {
  try {
    const { error } = mailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const superAdminExists = await SuperAdmin.findOne();
    if (superAdminExists) {
      return res.status(400).json({ msg: "Super Admin already exists" });
    }
    next();
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

module.exports = { AdminVerifyMiddleware, verify };
