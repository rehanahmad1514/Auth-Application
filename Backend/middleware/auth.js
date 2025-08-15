const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
        try {
            const token = req.body.token ||
                    req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
};

module.exports = authMiddleware;