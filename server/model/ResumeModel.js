const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String,
    sex: String,
    age: Number,
    phone: String,
    email: String,
    photo: String,
    weChat: String,
    qq: String,
    educationInfo: Array,
    project: Array,
    expertise:Array,
    race: Array,
    createTime: Date,
    updateTime: Date
})

module.exports = mongoose.model('Resume', Schema);