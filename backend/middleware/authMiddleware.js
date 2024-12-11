const jwt = require('jsonwebtoken');
const secret = "suvopaul"

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            console.error({ err });
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = info;
        next();
    });
};
