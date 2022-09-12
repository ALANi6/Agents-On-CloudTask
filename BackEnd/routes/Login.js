const router = require("express").Router();
const { loginController } = require("../control/LoginComtroller");


router.get("/", loginController);

module.exports = router;