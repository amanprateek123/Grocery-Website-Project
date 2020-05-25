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
            res.json({ status: 401, message: 'OTP did not Match.!' })

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