const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;