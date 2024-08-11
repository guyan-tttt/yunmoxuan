const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: String,
    content: String,
    createTime: Date
})

module.exports = mongoose.model('Journal', Schema);