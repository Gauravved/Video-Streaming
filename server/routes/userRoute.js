const {register, login} = require("../controller/userController");
const router = require("express").Router();
//routes
router.post("/register",register);
router.post("/login",login);

module.exports = router;
