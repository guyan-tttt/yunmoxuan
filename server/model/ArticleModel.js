const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    title: String, // 文章标题
    content: String, // 文章内容
    categoryID: String, // 文章分类ID
    tags: Array, // 文章标签ID
    desc: String, // 文章描述
    cover: String, // 文章封面
    authorID: String, // 作者ID
    isPublish: Boolean, // 是否发布
    isTop: Boolean, // 是否置顶
    isOriginal: Boolean, // 是否原创
    viewNum: Number, // 阅读量
    createTime: Date, // 创建时间
    updateTime: Date, // 更新时间
    isDelete: Boolean, // 是否删除
    likeNum: Number, // 点赞数
    aboutInfo: Object,
    commentNum: Number, // 评论数
})

module.exports = mongoose.model('Article', Schema);