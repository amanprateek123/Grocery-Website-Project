const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        res.status(401).json({ status: 401, message: "No Authorization Header" })
        return;
    }
    token = token.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'lalasupersecretkey')
    }
    catch (err) {
        res.status(500).json({ status: 401, message: "Authentication token Expired. Please Login Again." })
    }

    if (!decodedToken) {
        res.status(401).json({ status: 401, message: "Unauthenticated" })
    }
    req.userId = decodedToken.userId;
    next();
}