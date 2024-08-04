var express = require('express');
var router = express.Router();
const guestbookController = require('../../controller/web/guestbook.js')

// 添加留言
router.post('/add', guestbookController.add)

// 获取留言列表
router.get('/list', guestbookController.getList)

module.exports = router;