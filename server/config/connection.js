const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://golojhonalyn:Jhona101193@worldwidenews');

module.exports = mongoose.connection;