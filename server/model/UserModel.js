const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String, // 用户名
    password: String, // 密码
    gender: Number, // 性别 0-未知 1-男 2-女
    phone: String, // 手机号
    email: String, // 邮箱
    introduction: String, // 个人简介
    avatar: String, // 头像,
    nickname: String, // 昵称
    github: String, // github地址
    gitee: String, // gitee地址
    csdn: String, // csdn地址
})

module.exports = mongoose.model('User', userSchema);