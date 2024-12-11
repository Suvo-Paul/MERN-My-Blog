const fs = require('fs');
const path = require('path');
const Post = require('../models/Post.model');

exports.createPost = async (req, res) => {
    const { title, summary, content } = req.body;

    const { path: tempPath, originalname } = req.file;
    const fileExtension = path.extname(originalname);
    const fileName = path.basename(originalname, fileExtension);
    const newFileName = `${fileName}${fileExtension}`;
    const newPath = path.join('uploads', newFileName);

    try {
        fs.renameSync(tempPath, newPath);

        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: req.user.id,
        });

        res.status(201).json(postDoc);
    } catch (error) {
        console.error('Error creating post:', error);

        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }

        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updatePost = async (req, res) => {
    let newPath = null;

    if (req.file) {
        const { path: tempPath, originalname } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = tempPath + '.' + ext;
        fs.renameSync(tempPath, newPath);
    }

    try {
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);

        if (!postDoc) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (postDoc.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(20);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('author', ['username']);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};