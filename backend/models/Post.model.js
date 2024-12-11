const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    content: {
        type: String
    },
    cover: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;