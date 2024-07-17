const mongoose  = require('mongoose');

const Schema = mongoose.Schema({
    content: String, // 内容
    createTime: { type: Date, default: Date.now }, // 创建时间
    updateTime: { type: Date, default: Date.now }, // 更新时间
    userID: String, // 用户ID
    userInfo: Object, // 用户信息
    imgList: Array, // 图片列表
    likeNum: Number, // 点赞数量
    commentNum: Number, // 评论数量
    lookNum: Number, // 浏览数量
})

module.exports = mongoose.model("Trends", Schema)