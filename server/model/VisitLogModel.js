const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    ip: String,
    os: String,
    browser: String,
    createTime: Date
})

module.exports = mongoose.model("Visitlog", Schema)