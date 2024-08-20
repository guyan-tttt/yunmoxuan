const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: String,
    desc: String,
    link: String,
    type: String,
    score: Number,
    hot: Number,
    createTime: Date,
    updateTime: Date,
    cover: String,
    status: Number ,// 0： 停更，1：连载，2：完结,
    remark: String, // 备注 即为停更/完结时间
    imgList: Array

})

module.exports = mongoose.model("Animation", Schema);