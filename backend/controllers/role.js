const Roles = require("../model/role");

module.exports = {
  addRole: async (req, res) => {
    try {
      const role = req.body.role;
      const permissions = req.body.permissions;
      const newRole = await Roles.create({
        role,
        permissions,
      });
      res.status(200).send({ message: "role added" });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).send(err.message || "Something went wrong!");
    }
  },
  deleteRole: async (req, res) => {
    try {
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).send(err.message || "Something went wrong!");
    }
  },
};
