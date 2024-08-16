const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://golojhonalyn:<password>@worldwidenews.8iikf.mongodb.net/?retryWrites=true&w=majority&appName=WorldWideNews');

module.exports = mongoose.connection;