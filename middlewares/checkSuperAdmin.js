const SuperAdmin = require('../models/SuperAdmin');

const checkSuperAdmin = async (req, res, next) => {
  try {
    const superAdmin = await SuperAdmin.findOne({ role: 'super_admin' });

    if (superAdmin) {
      return next();
    } else {
      return res.status(403).send('Super admin has not been created. Access denied.');
    }
  } catch (err) {
    // Handle any errors that occur during the database query
    return res.status(500).send('Server error');
  }
};

module.exports = checkSuperAdmin;
