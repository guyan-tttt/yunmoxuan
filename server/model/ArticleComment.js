const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    nickname: String,
    content: String,
    time: String,
    articleID: String,
    address: String,
    createTime: Date
})

module.exports = mongoose.model("ArticleComment", Schema);