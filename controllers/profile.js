const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

const flash = require('../utils/flash')

const sgMail = require('@sendgrid/mail');
require('dotenv').config()

const DELIVERY_RANGE = 40000;
const SHOP_POINT = 'shimla';


// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = require('../utils/database')



exports.getProfile = (req, res) => {

    db.user.findByPk(req.userId, {
        include: {
            model: db.shippingAddress
        }
    }).then(user => {
        user = user.toJSON();
        // console.log(user);

        if (user.shippingAddresses) {
            user.shippingAddresses = user.shippingAddresses.map(add => ({ ...add, canDeliver: Number(add.distance) <= DELIVERY_RANGE }))
        }

        res.json({
            status: 200, message: flash.FETCHED_PROFILE, user: {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                dob: user.dob,
                email: user.email,
                mobile: user.mobile,
                addresses: user.shippingAddresses,
                createdAt: user.createdAt
            }
        })

    }).catch(err => {
        console.log(err);
        res.json({ status: 401, message: err.message })

    })

}

exports.postProfile = (req, res) => {

    console.log(req.body);

    db.user.findAll({
        where: {
            id: req.userId
        }
    }).then(user => {
        user = user[0].dataValues;
        // console.log(user);
        bcrypt.compare(req.body.confirmationPassword, user.password).then(match => {
            if (match) {
                db.user.update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    mobile: req.body.mobile,
                    gender: req.body.gender,
                    dob: req.body.dob
                }, {
                    where: {
                        id: req.userId
                    }
                }).then(rowsUpdated => {
                    res.json({ status: 200, message: flash.PROFILE_UPDATED })
                }).catch(err => {
                    res.json({ status: 500, message: flash.SERVER_ERROR })
                })
            } else {
                res.json({ status: 400, message: flash.WRONG_PASSWORD })
            }
        })

    }).catch(err => {
        console.log(err);
        res.json({ status: 401, message: err.message })

    })

}

exports.addAddress = async (req, res) => {

    console.log(req.body);
    let address = req.body;

    if (address.isPrimary) {
        await db.shippingAddress.update({
            isPrimary: false
        }, {
            where: {
                userId: req.userId
            }
        })
    }

    let distance = 10000;
    try {
        let route = await fetch(`http://dev.virtualearth.net/REST/V1/Routes/Driving?o=json&wp.0=${SHOP_POINT}&wp.1=${address.address}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}&routeAttributes=routeSummariesOnly&key=${process.env.BING_MAP_API_KEY}`);
        route = await route.json();
        if (route.resourceSets[0]) {
            if (route.resourceSets[0].resources[0]) {
                distance = route.resourceSets[0].resources[0].travelDistance;
                console.log(`>> ADDRESS : ${address.address},${address.city},${address.state},${address.country}  == ${distance}km`);
            }
        }
    }
    catch (err) {
        console.log(err);
    }

    db.shippingAddress.create({
        ...address,
        distance: distance,
        userId: req.userId
    }).then(rowsUpdated => {
        console.log(rowsUpdated);

        res.json({ status: 200, message: flash.ADDRESS_ADDED, addressId: rowsUpdated.dataValues.id });
    }).catch(err => {
        res.json({ status: 500, message: flash.SERVER_ERROR });
    })

}

exports.removeAddress = (req, res) => {

    console.log(req.body);

    db.shippingAddress.destroy({
        where: {
            id: req.body.id,
            userId: req.userId
        }
    }).then(rowsUpdated => {
        res.json({ status: 200, message: flash.ADDRESS_REMOVED });
    }).catch(err => {
        res.json({ status: 500, message: flash.SERVER_ERROR });
    })

}



exports.changeEmailOTP = (req, res) => {
    let token = parseInt(Math.random() * 1000000) % 10000000;
    console.log('OTP : ' + token);

    let authToken = jwt.sign({ email: req.body.email }, 'lalasupersecretkey', { expiresIn: '2h' });

    db.otp.create({
        userId: req.userId,
        value: token
    })
    const msg = {
        to: req.body.email,
        from: process.env.MAIL_SENDER,
        subject: flash.MAIL_OTP_SUBJECT,
        html: flash.MAIL_OTP_BODY(token),
    };
    // sgMail.send(msg).then(success => {
    //     console.log(success);
    //     return res.json({ status: 200, message: flash.OTP_SENT, id: authToken });
    // }).catch(err => {
    //     console.log(err);
    //     console.log(err.response.body.errors);
    //     res.status(500).json({ message: flash.SERVER_ERROR })
    // });
    return res.json({ status: 200, message: flash.OTP_SENT, authToken: authToken });
}

exports.changeEmail = (req, res) => {
    let authToken = req.body.authToken;
    if (!authToken) {
        return res.json({ status: 401, message: flash.NO_AUTH_HEADER })
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(authToken, 'lalasupersecretkey')
    }
    catch (err) {
        res.status(500).json({ status: 401, message: flash.INVALID_AUTH })
    }

    if (!decodedToken) {
        res.status(401).json({ status: 401, message: flash.INVALID_AUTH })
    }

    db.otp.findAll({
        where: { userId: req.userId },
        order: [['createdAt', 'DESC']]
    }).then(doc => {
        doc = doc[0];
        if (doc) {
            console.log("OTP FOUND : ");
            // console.log(doc);
            if (doc.dataValues.value == req.body.otp) {
                db.user.update(
                    { email: decodedToken.email },
                    { where: { id: req.userId } }
                ).then(rowsUpdated => {
                    console.log(rowsUpdated);

                    db.otp.destroy({
                        where: { userId: req.userId },
                    })

                    return res.json({ status: 200, message: flash.OTP_VERIFIED })
                })
            }
            else {
                return res.json({ status: 417, message: flash.OTP_MISMATCH })
            }
        } else {
            console.log("NO OTP FOUND.");
            return res.json({ status: 500, message: flash.SERVER_ERROR })

        }

    })
}

exports.changeMobileOTP = (req, res) => {
    let token = parseInt(Math.random() * 1000000) % 10000000;
    console.log('OTP : ' + token);

    let authToken = jwt.sign({ mobile: req.body.mobile }, 'lalasupersecretkey', { expiresIn: '2h' });

    db.otp.create({
        userId: req.userId,
        value: token
    })

    // ? OTP sent to mobile.

    return res.json({ status: 200, message: flash.OTP_SENT, authToken: authToken });
}

exports.changeMobile = (req, res) => {
    let authToken = req.body.authToken;
    if (!authToken) {
        return res.json({ status: 401, message: flash.NO_AUTH_HEADER })
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(authToken, 'lalasupersecretkey')
    }
    catch (err) {
        res.status(500).json({ status: 401, message: flash.INVALID_AUTH })
    }

    if (!decodedToken) {
        res.status(401).json({ status: 401, message: flash.INVALID_AUTH })
    }

    db.otp.findAll({
        where: { userId: req.userId },
        order: [['createdAt', 'DESC']]
    }).then(doc => {
        doc = doc[0];
        if (doc) {
            console.log("OTP FOUND : ");
            console.log(doc.dataValues.value + "==" + req.body.otp);
            if (doc.dataValues.value == req.body.otp) {
                db.user.update(
                    { mobile: decodedToken.mobile },
                    { where: { id: req.userId } }
                ).then(rowsUpdated => {
                    console.log(rowsUpdated);

                    db.otp.destroy({
                        where: { userId: req.userId },
                    })

                    return res.json({ status: 200, message: flash.OTP_VERIFIED })
                })
            }
            else {
                return res.json({ status: 417, message: flash.OTP_MISMATCH })
            }
        } else {
            console.log("NO OTP FOUND.");
            return res.json({ status: 500, message: flash.SERVER_ERROR })

        }

    })
}





exports.getTest = (req, res) => {
    db.product.findAll({
        attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'totalProducts']],
    }).then(([total]) =>
        res.json(total)
    )
}