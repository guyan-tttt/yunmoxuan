const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String, // 图片名称
    src: String, // 图片地址
    createTime: String, // 创建时间
    updateTime: String, // 更新时间
    categoryID: String, // 分类ID
    categoryName: String, // 分类名称
    size: Number, // 图片大小
})

module.exports = mongoose.model('Image', Schema);