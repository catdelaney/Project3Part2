const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://worldwidenews:WWN123@worldwidenews.8iikf.mongodb.net/');

module.exports = mongoose.connection;