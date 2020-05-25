const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./utils/database').sequelize
require('dotenv').config()

const authRoutes = require('./routes/auth')



const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(authRoutes);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

sequelize.sync().then(result => {
    // console.log(result);
    console.log("database connected...");

}).catch(err => {
    console.log(err);

})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));