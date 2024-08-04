const mongoose  = require('mongoose');

const guestbookSchema = new mongoose.Schema({
    nickname:String,
    email:String,
    content:String,
    createTime:Date,
    avatar: String,
    os: String
});

module.exports = mongoose.model('guestbook', guestbookSchema);
