const { decodeToken } = require('../utils/managementToken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token is missing' });

    try {
        const payload = decodeToken(token, process.env.ACCESS_TOKEN_KEY);
        // attach minimal user info
        req.user = {
            id: payload.id,
            email: payload.email,
            role: payload.role
        };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = authMiddleware;
