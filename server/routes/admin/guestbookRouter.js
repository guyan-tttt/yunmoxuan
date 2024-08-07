var express = require('express');
var router = express.Router();
const guestbookController = require('../../controller/admin/guestbook.js')

// 获取留言列表
router.get('/list', guestbookController.getList)

// 删除留言
router.delete('/del/:id', guestbookController.delete)

module.exports = router;