const usersController = require("../controllers/users.controllers");

const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-Profile", usersController.userProfile);

module.exports = router;
