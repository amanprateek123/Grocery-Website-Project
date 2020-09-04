module.exports = (req, res, next) => {
    if (req.user.role == 'D') {
        next();
    }
    else {
        res.status(401).json({ status: 401, message: 'UnAuthorized.' })
    }
}