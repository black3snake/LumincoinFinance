const AuthController = require('../controllers/auth.controller');
const express = require('express');
const MiddlewareUtils = require("../utils/middleware.utils");

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.get("/users", MiddlewareUtils.validateUser, AuthController.getUsers );

module.exports = router;