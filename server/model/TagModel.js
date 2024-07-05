const mongoose  = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: String, // 标签名称
    icon: String, // 标签图标
    desc: String, // 标签描述
    createTime: Date, // 创建时间
    updateTime: Date, // 更新时间
})

module.exports = mongoose.model('Tag', tagSchema);