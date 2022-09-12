const router = require("express").Router();
const { Signupcontrol } = require("../control/SignupController");

router.post("/", Signupcontrol);

module.exports = router;