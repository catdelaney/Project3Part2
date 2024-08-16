const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://worldwidenews:WWN123@worldwidenews.mongodb.net/worldwidenews?retryWrites=true&w=majority');

module.exports = mongoose.connection;