const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const flash = require('../utils/flash')

const sgMail = require('@sendgrid/mail');
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = require('../utils/database')



exports.getProfile = (req, res) => {

    db.user.findAll({
        include: {
            model: db.shippingAddress
        },
        where: {
            id: req.userId
        }
    }).then(user => {
        user = user[0].dataValues;
        // console.log(user);
        res.json({
            status: 200, message: flash.FETCHED_PROFILE, user: {
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                dob: user.dob,
                email: user.email,
                mobile: user.mobile,
                addresses: user.shippingAddresses
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

exports.addAddress = (req, res) => {

    console.log(req.body);
    let address = req.body;

    db.shippingAddress.create({
        ...address,
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




exports.getTest = (req, res) => {
    db.user.findAll({
        include: {
            model: db.shippingAddress
        }
    }).then(user => {
        res.json(user)

    }).catch(err => {

        res.send('error')
    })
}