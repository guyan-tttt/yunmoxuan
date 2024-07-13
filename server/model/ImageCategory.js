const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name: String, // 图片分类名称
    desc: String, // 图片分类描述
    createTime: Date, // 创建时间
    updateTime: Date, // 更新时间
})

module.exports = mongoose.model('ImageCategory', Schema)