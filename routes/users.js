var express = require('express');
var router = express.Router();
const user = require("../Controller/user");
const { validate } = require("../config/jwtConfig");
/* GET users listing. */
router.post("/signup", user.create);

router.post("/login", user.login);
router.get("/validate", validate, user.validateUser);

module.exports = router;
