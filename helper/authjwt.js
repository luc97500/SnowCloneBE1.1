const jwt = require('jsonwebtoken');

const authJwt = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        req.user = verified;
        next(); 
    } catch (error) {
        return res.status(400).json({ msg: "Invalid token." });
    }
};

module.exports = authJwt;
