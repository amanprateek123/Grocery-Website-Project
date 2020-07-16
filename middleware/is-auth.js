const jwt = require('jsonwebtoken');
const db = require('../utils/database')

module.exports = (req, res, next) => {
    let token = req.get('Authorization');
    if (!token) {
        return res.status(401).json({ status: 401, message: "No Authorization Header" })
    }
    token = token.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'lalasupersecretkey')
    }
    catch (err) {
        return res.status(500).json({ status: 401, message: "Authentication token Expired. Please Login Again." })
    }

    if (!decodedToken) {
        return res.status(401).json({ status: 401, message: "Unauthenticated" })
    }

    req.userId = decodedToken.userId;

    db.user.findByPk(req.userId)
        .then(user => {
            req.user = user;
            next();
        }).catch(err => {
            console.log(err)
            next();
        })
}