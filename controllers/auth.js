const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const flash = require('../utils/flash')

require('dotenv').config()
let EMAILS = require('../utils/email');
let EMAILS_ON = true; // CONFIG
EMAILS_ON = !EMAILS.transporter ? false : EMAILS_ON;




const db = require('../utils/database')

exports.sendOTP = (req, res) => {
    console.log(req.body);

    const valErrors = validationResult(req);

    if (!valErrors.isEmpty()) {
        return res.status(422).json({ status: 422, errors: valErrors.array(), message: 'Invalid Values : ' + valErrors.array().map(err => `${err.param} `).join(',') });
    }

    db.user.findAll({
        where: { email: req.body.email }
    }).then(async docs => {
        if (docs.length) {
            if (docs[0].dataValues.verified) {
                return res.json({ status: 7, message: flash.USER_EXISTS })
            }
            else {
                let id = docs[0].id;
                bcrypt.hash(req.body.password, 12).then(hashedPassword => {

                    db.user.update({
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: hashedPassword,
                        mobile: req.body.mobile
                    }, { where: { id: id } })
                        .then(async rowsUpdated => {
                            console.log('User UPDATED with ID : ' + id);
                            let authToken = jwt.sign({ id }, 'lalasupersecretkey', { expiresIn: '2h' });
                            let token = parseInt(Math.random() * 1000000) % 10000000;
                            console.log('otp : ' + token);

                            db.otp.create({
                                userId: id,
                                value: token
                            })

                            if (EMAILS_ON) {
                                try {
                                    let info = await EMAILS.sendMail({
                                        to: req.body.email,
                                        subject: flash.REG_OTP_SUBJECT,
                                        html: flash.REG_OTP_BODY(token),
                                    })
                                    console.log('EMAIL SENT ', info.messageId);
                                }
                                catch (err) {
                                    console.log('EMAIL NOT SENT');
                                    console.log(err);
                                    throw new Error('Failed to send Email.')
                                }
                            }


                            return res.json({ status: 200, message: flash.OTP_SENT, id: authToken });
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({ message: err.message })
                        });
                });
            }
        }
        else {
            bcrypt.hash(req.body.password, 12).then(hashedPassword => {

                db.user.create({
                    email: req.body.email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hashedPassword,
                    mobile: req.body.mobile
                }).then(async user => {
                    let id = user.dataValues.id;
                    console.log('User created with ID : ' + id);
                    let authToken = jwt.sign({ id }, 'lalasupersecretkey', { expiresIn: '2h' });
                    let token = parseInt(Math.random() * 1000000) % 10000000;

                    console.log('otp : ' + token);

                    db.otp.create({
                        userId: id,
                        value: token
                    })


                    if (EMAILS_ON) {
                        try {
                            let info = await EMAILS.sendMail({
                                to: req.body.email,
                                subject: flash.REG_OTP_SUBJECT,
                                html: flash.REG_OTP_BODY(token),
                            })
                            console.log('EMAIL SENT ', info.messageId);
                        }
                        catch (err) {
                            console.log('EMAIL NOT SENT');
                            console.log(err);
                            throw new Error('Failed to send Email.')
                        }
                    }

                    return res.json({ status: 200, message: flash.OTP_SENT, id: authToken });

                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ message: flash.SERVER_ERROR })
                });
            });
        }
    })

};

// Verify OTP for Registration
exports.verifyOTP = (req, res) => {
    // console.log(req.body);
    let authToken = req.body.id;
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
    let userId = decodedToken.id;

    db.otp.findAll({
        where: { userId: userId },
        order: [['createdAt', 'DESC']]
    }).then(doc => {
        doc = doc[0];
        if (doc) {
            console.log("OTP FOUND : ");
            // console.log(doc);
            if (doc.dataValues.value == req.body.otp) {
                db.user.update(
                    { verified: true },
                    { where: { id: userId } }
                ).then(async rowsUpdated => {
                    console.log(rowsUpdated);

                    db.otp.destroy({
                        where: { userId: userId },
                    })

                    if (EMAILS_ON) {
                        try {
                            let info = await EMAILS.sendMail({
                                to: req.body.email,
                                subject: 'Welcome to LalaDukaan',
                                html: 'Your account for LalaDukaan is successfully created.',
                            })
                            console.log('EMAIL SENT ', info.messageId);
                        }
                        catch (err) {
                            console.log('EMAIL NOT SENT');
                            console.log(err);
                        }
                    }

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
};


exports.login = (req, res) => {
    console.log(req.body);

    db.user.findOne({
        where: { email: req.body.email }
    }).then(user => {
        if (user) {

            if (user.dataValues.verified) {
                bcrypt.compare(req.body.password, user.dataValues.password).then(match => {
                    if (match) {
                        let token = jwt.sign({
                            email: user.dataValues.email,
                            userId: user.dataValues.id
                        }, 'lalasupersecretkey', {
                            expiresIn: '2h'
                        });
                        return res.json({ status: 200, message: flash.SUCCESS, userId: user.id, userName: user.firstName + ' ' + user.lastName, idToken: token, role: user.role })
                    }
                    else {
                        return res.json({ status: 401, message: flash.WRONG_PASSWORD })
                    }
                })
            }
            else {
                return res.json({ status: 401, message: flash.UNVERIFIED_ACC })
            }

        }
        else {
            return res.json({ status: 401, message: flash.NO_ACC })
        }
    }).catch(err => {
        console.log(err);
        res.json({ status: 500, message: 'Server Error' })
    })
}


exports.changePassword = (req, res) => {

    const valErrors = validationResult(req);

    console.log(req.body)

    if (!valErrors.isEmpty()) {
        return res.status(422).json({ status: 422, errors: valErrors.array(), message: 'Invalid Values : ' + valErrors.array().map(err => `${err.param} `).join(',') });
    }

    db.user.findAll({
        where: {
            id: req.userId
        }
    }).then(rows => {
        if (rows) {
            let user = rows[0].dataValues;
            bcrypt.compare(req.body.old, user.password).then(match => {
                if (match) {
                    bcrypt.hash(req.body.new, 12).then(hashedPassword => {
                        db.user.update({
                            password: hashedPassword
                        }, {
                            where: {
                                id: req.userId
                            }
                        }).then(rowsUpdated => {
                            return res.json({ status: 200, message: flash.PASSWORD_CHANGED })
                        }).catch(err => {
                            return res.json({ status: 500, message: err.message });
                        })
                    }).catch(err => {
                        return res.json({ status: 500, message: err.message });
                    })
                }
                else {
                    return res.json({ status: 403, message: flash.WRONG_PASSWORD })
                }
            }).catch(err => {
                return res.json({ status: 500, message: err.message })
            })
        }
    })
}



exports.prOTP = (req, res) => {
    db.user.findAll({
        where: {
            email: req.body.email
        }
    }).then(async rows => {
        if (rows) {
            let user = rows[0];

            if (user) {
                let token = parseInt(Math.random() * 1000000) % 10000000;
                console.log("OTP: ", token);

                db.otp.create({
                    userId: user.id,
                    value: token
                })


                if (EMAILS_ON) {
                    try {
                        let info = await EMAILS.sendMail({
                            to: req.body.email,
                            subject: flash.PR_OTP_SUBJECT,
                            html: flash.PR_OTP_BODY(token),
                        })
                        console.log('EMAIL SENT ', info.messageId);
                    }
                    catch (err) {
                        console.log('EMAIL NOT SENT');
                        console.log(err);
                        throw new Error('Failed to send Email.')
                    }
                }


                return res.json({ status: 200, message: flash.OTP_SENT, id: user.id });
            } else {
                return res.json({ status: 400, message: flash.NO_ACC })
            }

        }
        else {
            return res.json({ status: 400, message: flash.NO_ACC })
        }
    })
}


exports.prOTPVerify = (req, res) => {
    db.otp.findAll({
        where: {
            userId: req.body.id
        },
        order: [['createdAt', 'DESC']]
    }).then(rows => {
        if (rows[0]) {
            let token = rows[0].value;
            if (token == req.body.otp) {
                let authToken = jwt.sign({
                    id: rows[0].userId
                }, 'lalasupersecretkey', {
                    expiresIn: '2h'
                });

                db.otp.destroy({
                    where: {
                        userId: req.body.id
                    }
                })
                return res.json({ status: 200, message: flash.OTP_VERIFIED, authToken });
            } else {
                return res.json({ status: 417, message: flash.OTP_MISMATCH });
            }
        }
        else {
            return res.json({ status: 500, message: flash.SERVER_ERROR });
        }
    })
}

exports.prReq = (req, res) => { // password reset request

    const valErrors = validationResult(req);

    if (!valErrors.isEmpty()) {
        return res.status(422).json({ status: 422, errors: valErrors.array(), message: 'Invalid Values : ' + valErrors.array().map(err => `${err.param} `).join(',') });
    }


    let token = req.body.id;
    if (!token) {
        res.status(401).json({ status: 401, message: flash.NO_AUTH_HEADER })
        return;
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'lalasupersecretkey')
    }
    catch (err) {
        res.status(500).json({ status: 401, message: flash.AUTH_EXPIRED })
    }

    if (!decodedToken) {
        res.status(401).json({ status: 401, message: flash.INVALID_AUTH })
    }
    let userId = decodedToken.id;

    console.log("USER ID:", userId);


    bcrypt.hash(req.body.password, 12).then(hashedPassword => {
        db.user.update({
            password: hashedPassword
        }, {
            where: {
                id: userId
            }
        }).then(rowsUpdated => {
            return res.json({ status: 200, message: flash.PASSWORD_RESET });
        }).catch(err => {
            return res.json({ status: 500, message: flash.SERVER_ERROR });
        })
    }).catch(err => {
        return res.json({ status: 500, message: flash.SERVER_ERROR });
    })
}

