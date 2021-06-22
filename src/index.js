const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("../config/db");



const app = express();
mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/series',require('./routes/series'));

const userRoutes = require("./routes/user"); //bring in our user routes

// Static Files
 app.use(express.static(__dirname + '/public'));  // Le decimos al servidor donde nos manda cuando abramos el puerto
 app.use("/user", userRoutes);

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
