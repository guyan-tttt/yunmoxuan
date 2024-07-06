const mongoose  = require('mongoose');

const Schema = new  mongoose.Schema({
    name: String,// 分类名称
    desc: String,// 分类描述
    createTime: {type: Date, default: Date.now()},// 创建时间
    updateTime: {type: Date, default: Date.now()}// 更新时间
})

module.exports = mongoose.model('Category', Schema);