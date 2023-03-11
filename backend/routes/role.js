const express = require("express");
const router = express.Router();

const roleController = require("../controllers/role");

router.post("/add-role", roleController.addRole);
router.delete("/delete-role", roleController.deleteRole);


module.exports = router;
