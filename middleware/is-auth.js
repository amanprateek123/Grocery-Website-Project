const jwt = require('jsonwebtoken');
const db = require('../utils/database')
const stripe = require('stripe')
const bodyParser = require('body-parser')

require('dotenv').config()
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

module.exports = (req, res, next) => {

    const sig = req.get('stripe-signature');
    let event = null;
    if (sig) {
        try {
            event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET);
            console.log('STRIPE WEBHOOK ');
            next();
            return;

        }
        catch (err) {
            console.log(err);
            console.log('IS-AUTH : NOT STRIPE');
            event = null;
            return res.status(401).json({ status: 401, message: "No Authorization" });
        }
    }

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