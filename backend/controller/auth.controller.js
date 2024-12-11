const User = require("../models/User.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);
        const userDoc = await User.create({
            username: username,
            password: hashPassword
        })

        res.json(userDoc);
    } catch (error) {
        res.status(400).json({ message: 'Registration failed' });
        console.log(error);
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const comparePassword = await bcrypt.compare(password, userDoc.password);

        if (!comparePassword) {
            return res.status(401).json({ message: 'Wrong credentials' });
        }

        jwt.sign({ username, id: userDoc._id }, process.env.SECRET_KEY, {}, (err, token) => {
            if (err) {
                console.error('JWT Error:', err);
                return res.status(500).json({ message: 'Token generation failed' });
            }
            // console.log(token);

            res.cookie("token", token,).json({
                id: userDoc._id,
                username,
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.profile = (req,res) => {
    const { user } = req;
    res.json(user);
}

exports.logout = (req, res) => {
    res.cookie("token", "").json("OK");
}