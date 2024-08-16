const { superAdminSchema } = require("../validators/adminValidator");
const SuperAdmin = require("../models/SuperAdmin");

async function createSuperAdmin(req, res) {
  const { error } = superAdminSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    const superAdminExists = await SuperAdmin.findOne();
    if (superAdminExists) {
      return res.status(400).json({ msg: "Super Admin already exists" });
    }

    const { username, email, pwd } = req.body;

    const newSuperAdmin = new SuperAdmin({
      username,
      email,
      pwd,
    });

    await newSuperAdmin.save();

    res.status(201).json({ msg: "Super Admin created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

module.exports = { createSuperAdmin };
