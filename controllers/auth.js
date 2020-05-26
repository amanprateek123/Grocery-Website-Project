const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const sgMail = require('@sendgrid/mail');
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = require('../utils/database')

exports.sendOTP = (req, res) => {
    console.log(req.body);

    db.user.findAll({
        where: { email: req.body.email }
    }).then(docs => {
        if (docs.length) {
            if (docs[0].dataValues.verified) {
                res.json({ status: 7, message: "User with this Email Already Exists. " + docs[0].id })
            }
            else {
                let id = docs[0].id;
                bcrypt.hash(req.body.password, 12).then(hashedPassword => {

                    db.user.update({
                        email: req.body.email,
                        name: req.body.name,
                        password: hashedPassword,
                        mobile: req.body.mobile
                    }, { where: { id: id } }).then(rowsUpdated => {
                        console.log('User UPDATED with ID : ' + id);
                        let authToken = jwt.sign({ id }, 'lalasupersecretkey', { expiresIn: '1h' });
                        crypto.randomBytes(3, function (err, buffer) {
                            var token = buffer.toString('hex');
                            console.log('otp : ' + token);

                            db.otp.create({
                                userId: id,
                                value: token
                            })
                            const msg = {
                                to: req.body.email,
                                from: process.env.MAIL_SENDER,
                                subject: 'OTP for LalaDukaan',
                                html: `Welcome to LalaDukaan. <strong>${token}</strong> is your OTP for the registration process. go ahead and complete your registration.`,
                            };
                            // sgMail.send(msg).then(success => {
                            //     console.log(success);
                            //     res.json({ message: 'OTP has been sent to your email.', id: id });
                            // }).catch(err => {
                            //     console.log(err);
                            //     console.log(err.response.body.errors);
                            //     res.status(500).json({ message: 'Server Error' });
                            // });
                            res.json({ message: 'OTP has been sent to your email.', id: authToken });
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'internal Server Error' })
                    });
                });
            }
        }
        else {
            bcrypt.hash(req.body.password, 12).then(hashedPassword => {

                db.user.create({
                    email: req.body.email,
                    name: req.body.name,
                    password: hashedPassword,
                    mobile: req.body.mobile
                }).then(user => {
                    let id = user.dataValues.id;
                    console.log('User created with ID : ' + id);
                    let authToken = jwt.sign({ id }, 'lalasupersecretkey', { expiresIn: '1h' });
                    let token = parseInt(Math.random() * 1000000) % 10000000;

                    console.log('otp : ' + token);

                    db.otp.create({
                        userId: id,
                        value: token
                    })
                    const msg = {
                        to: req.body.email,
                        from: process.env.MAIL_SENDER,
                        subject: 'OTP for LalaDukaan',
                        html: `Welcome to LalaDukaan. <strong>${token}</strong> is your OTP for the registration process. go ahead and complete your registration.`,
                    };
                    // sgMail.send(msg).then(success => {
                    //     console.log(success);
                    //     res.json({ message: 'OTP has been sent to your email.', id: id });
                    // }).catch(err => {
                    //     console.log(err);
                    //     console.log(err.response.body.errors);
                    //     res.status(500).json({ message: 'Server Error' });
                    // });
                    res.json({ message: 'OTP has been sent to your email.', id: authToken });

                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'internal Server Error' })
                });
            });
        }
    })

};


exports.verifyOTP = (req, res) => {
    // console.log(req.body);
    let authToken = req.body.id;
    if (!authToken) {
        res.json({ status: 401, message: 'NO auth token.' })
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(authToken, 'lalasupersecretkey')
    }
    catch (err) {
        res.status(500).json({ status: 401, message: "Invalid Authentication token." })
    }

    if (!decodedToken) {
        res.status(401).json({ status: 401, message: "Unauthenticated" })
    }
    let userId = decodedToken.id;

    db.otp.findAll({
        where: { userId: userId },
        order: [['createdAt', 'DESC']]
    }).then(doc => {
        doc = doc[0];
        console.log("OTP FOUND : ");
        // console.log(doc);
        if (doc.dataValues.value == req.body.otp) {
            db.user.update(
                { verified: true },
                { where: { id: userId } }
            ).then(rowsUpdated => {
                console.log(rowsUpdated);
                res.json({ status: 200, message: 'Successfully Verified' })

                db.otp.destroy({
                    where: { userId: userId },
                })
            })
        }
        else
            res.json({ status: 401, message: 'OTP did NOT Match.!' })

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
                            expiresIn: '1h'
                        });
                        res.json({ status: 200, message: "Success", userId: user.id, userName: user.dataValues.name, idToken: token })
                    }
                    else {
                        res.json({ status: 401, message: "Wrong Password" })
                    }
                })
            }
            else {
                res.json({ status: 401, message: "Account needs verification. Please complete the registration process again." })
            }

        }
        else {
            res.json({ status: 401, message: "No account with this Email." })
        }
    })
}


exports.changePassword = (req, res) => {
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
                            res.json({ status: 200, message: 'Successfully Updated Password.' })
                        }).catch(err => {
                            res.json({ status: 500, message: err.message });
                        })
                    }).catch(err => {
                        res.json({ status: 500, message: err.message });
                    })
                }
                else {
                    res.json({ status: 403, message: 'Wrong Password' })
                }
            }).catch(err => {
                res.json({ status: 500, message: err.message })
            })
        }
    })
}



exports.prOTP = (req, res) => {
    db.user.findAll({
        where: {
            email: req.body.email
        }
    }).then(rows => {
        if (rows) {
            let user = rows[0];

            if (user) {
                let token = parseInt(Math.random() * 1000000) % 10000000;
                console.log("OTP: ", token);

                db.otp.create({
                    userId: user.id,
                    value: token
                })

                const msg = {
                    to: req.body.email,
                    from: process.env.MAIL_SENDER,
                    subject: 'OTP for LalaDukaan',
                    html: `Laladukaan. <strong>${token}</strong> is your OTP for resetting your password.`,
                };
                // sgMail.send(msg).then(success => {
                //     console.log(success);
                //     res.json({ message: 'OTP has been sent to your email.', id: id });
                // }).catch(err => {
                //     console.log(err);
                //     console.log(err.response.body.errors);
                //     res.status(500).json({ message: 'Server Error' });
                // });
                res.json({ status: 200, message: "OTP has been sent to your email.", id: user.id });
            } else {
                res.json({ status: 400, message: 'No Account with this email' })
            }

        }
        else {
            res.json({ status: 400, message: 'No Account with this email' })
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
                    expiresIn: '1h'
                });

                db.otp.destroy({
                    where: {
                        userId: req.body.id
                    }
                })
                res.json({ status: 200, message: 'OTP VErified for Password Reset.', authToken });
            } else {
                res.json({ status: 400, message: "OTP did NOT Match" });
            }
        }
        else {
            res.json({ status: 500, message: "server Error" });
        }
    })
}

exports.prReq = (req, res) => { // password reset request
    let token = req.body.id;
    if (!token) {
        res.status(401).json({ status: 401, message: "No Authorization Token." })
        return;
    }
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
            res.json({ status: 200, message: 'Password Reset Successful.' });
        }).catch(err => {
            res.json({ status: 500, message: 'Server Error. Cant Update' });
        })
    }).catch(err => {
        res.json({ status: 500, message: 'Server Error. Hashing problem' });
    })
}


exports.getTest = (req, res) => {
    db.user.findAll({
        include: {
            model: db.address
        }
    }).then(user => {
        res.json(user)

    }).catch(err => {

        res.send('error')
    })
}