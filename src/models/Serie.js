const mongoose = require('mongoose');
const { Schema } = mongoose;

const Serie = new Schema({
    title: String,
    description: String,
    image: String,
    release_date: Date
});

module.exports = mongoose.model('Serie', Serie);