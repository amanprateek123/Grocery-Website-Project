const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const sgMail = require('@sendgrid/mail');
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = require('../utils/database')



exports.getProfile = (req, res) => {

    db.user.findAll({
        include: {
            model: db.address
        },
        where: {
            id: req.userId
        }
    }).then(user => {
        user = user[0].dataValues;
        // console.log(user);
        res.json({ status: 200, message: "fetched user details", user: { name: user.name, email: user.email, mobile: user.mobile, addresses: user.addresses } })

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
                    name: req.body.name,
                    address: req.body.address,
                    mobile: req.body.mobile
                }, {
                    where: {
                        id: req.userId
                    }
                }).then(rowsUpdated => {
                    res.json({ status: 200, message: "Successfully Updated Profile" })
                }).catch(err => {
                    res.json({ status: 500, message: "Server Error" })
                })
            } else {
                res.json({ status: 400, message: "Wrong Password" })
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

    db.address.create({
        ...address,
        userId: req.userId
    }).then(rowsUpdated => {
        console.log(rowsUpdated);

        res.json({ status: 200, message: "Address Added Successfully", addressId: rowsUpdated.dataValues.id });
    }).catch(err => {
        res.json({ status: 500, message: "Server Error" });
    })

}

exports.removeAddress = (req, res) => {

    console.log(req.body);

    db.address.destroy({
        where: {
            id: req.body.id,
            userId: req.userId
        }
    }).then(rowsUpdated => {
        res.json({ status: 200, message: "Address Removed Successfully" });
    }).catch(err => {
        res.json({ status: 500, message: "Server Error" });
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