const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: String,
    content: String,
    createTime: Date,
    type: Number, // 1为lgo, 2为message
    view: Boolean
})

module.exports = mongoose.model('Journal', Schema);