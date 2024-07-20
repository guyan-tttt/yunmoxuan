const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    nickname: String,
    content: String,
    time: String,
    trendsID: String,
    ip: String,
    createTime: Date
})

module.exports = mongoose.model("TrendsComment", Schema);