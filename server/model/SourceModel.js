const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String, // 资源名称
    desc: String, // 资源描述
    logo: String, // 资源logo
    bg: String, // 资源背景图
    link: String, // 资源链接
    groupId: String, // 资源所属分组
    groupName: String, // 资源所属分组名称
    createTime: String, // 创建时间
    updateTime: String, // 更新时间
})

module.exports = mongoose.model('Source', Schema)