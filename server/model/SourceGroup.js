const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String, // 名称
    desc: String, // 描述
    logo: String, // logo
    source: Array, // 资源列表
    createTime: Date, // 创建时间
    updateTime: Date, // 更新时间
})

module.exports = mongoose.model('SourceGroup', Schema);