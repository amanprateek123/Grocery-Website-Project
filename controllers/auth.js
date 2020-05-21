const crypto = require('crypto');

const sgMail = require('@sendgrid/mail');
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const otp = require('../models/otp')
const User = require('../models/user')

exports.sendOTP = (req, res) => {
    console.log(req.body);

    User.findAll({
        where: { email: req.body.email }
    }).then(docs => {
        if (docs.length) {
            if (docs[0].dataValues.verified) {
                res.json({ status: 7, message: "User with is Email Already Exists. " + docs[0].id })
            }
            else {
                let id = docs[0].id;
                crypto.randomBytes(3, function (err, buffer) {
                    var token = buffer.toString('hex');
                    console.log('otp : ' + token);

                    otp.create({
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
                    //     res.json({ status: 6, id: id, message: "User already registered but needs Verification OTP Sent to email .. please enter " + docs[0].id })
                    // }).catch(err => {
                    //     console.log(err);
                    //     console.log(err.response.body.errors);
                    //     res.status(500).json({ message: 'Server Error' });
                    // });
                });

                res.json({ status: 6, id: id, message: "User already registered but needs Verification OTP Sent to email .. please enter " + docs[0].id })
            }
        }
        else {
            User.create({
                email: req.body.email
            }).then(user => {
                let id = user.dataValues.id;
                console.log('User created with ID : ' + id);

                crypto.randomBytes(3, function (err, buffer) {
                    var token = buffer.toString('hex');
                    console.log('otp : ' + token);

                    otp.create({
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
                    res.json({ message: 'OTP has been sent to your email.', id: id });
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({ message: 'internal Server Error' })
            });
        }
    })

};


exports.verifyOTP = (req, res) => {
    console.log(req.body);
    otp.findAll({
        where: { userId: req.body.id },
        order: [['createdAt', 'DESC']]
    }).then(doc => {
        doc = doc[0];
        console.log("OTP FOUND : ");
        // console.log(doc);
        if (doc.dataValues.value == req.body.otp) {
            User.update(
                { verified: true },
                { where: { id: req.body.id } }
            ).then(rowsUpdated => {
                console.log(rowsUpdated);
                res.json({ status: 200, message: 'Successfully Verified. Continue registration.' })

                otp.destroy({
                    where: { userId: req.body.id },
                })
            })
        }
        else
            res.json({ status: 401, message: 'OTP did not Match.!' })

    })
};

exports.registerUserDetails = (req, res) => {
    console.log(req.body);
    //? needs server side validation and authentication through jwt.
    User.update({
        name: req.body.name,
        password: req.body.password, //! hash password
        mobile: req.body.mobile
    }, {
        where: {
            id: req.body.id  //! security issue
        }
    })

    res.json({ status: 200, message: "Successfully Finished the registration Process." })

}

exports.login = (req, res) => {
    console.log(req.body);

    User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        if (user) {

            if (user.dataValues.password == req.body.password) {
                res.json({ status: 200, message: "Success", userId: user.id, idToken: Math.random() })
            }
            else {
                res.json({ status: 401, message: "Wrong Password" })
            }
        }
        else {
            res.json({ status: 401, message: "No account with this Email." })
        }
    })
}
