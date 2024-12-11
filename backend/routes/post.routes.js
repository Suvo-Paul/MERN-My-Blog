const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { createPost, getPosts, getPostById, updatePost } = require('../controller/post.controller');
const uploadMiddleware = require("../middleware/uploadMiddleware")

router.post("/post", verifyToken, uploadMiddleware.single("file"), createPost);
router.put("/post", verifyToken, uploadMiddleware.single("file"), updatePost);
router.get("/post", getPosts);
router.get("/post/:id", getPostById);

module.exports = router;