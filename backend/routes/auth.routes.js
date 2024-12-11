const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { register, login, logout, profile } = require('../controller/auth.controller');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.post("/logout", logout);

module.exports = router