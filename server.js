const path = require('path');
const fs = require('fs')

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
require('dotenv').config()

const sequelize = require('./utils/database').sequelize

const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const shippingRoutes = require('./routes/shipping')

const isAuth = require('./middleware/is-auth')
const isAdmin = require('./middleware/is-admin')
const isShipping = require('./middleware/is-shipping')



const app = express();
const PORT = process.env.PORT || 5000;

const EMAILS = require('./utils/email')
const EMAILS_ON = true; // CONFIG
if (EMAILS_ON) {
    EMAILS.init();
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))
// log all requests to access.log
app.use(morgan('tiny', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))


// API Routes 
app.use(authRoutes, profileRoutes, shopRoutes);
app.use('/admin', isAuth, isAdmin, adminRoutes);
app.use('/shipping', isAuth, isShipping, shippingRoutes);


app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


//  Database
sequelize.sync().then(result => {
    console.log("[+] >> DATABASE Connected");
}).catch(err => {
    console.log(err);
})

app.listen(PORT, () => console.log(`[-] >> Listening on PORT ${PORT}`));