require('dotenv').config({path: "../../.env"});
const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
};