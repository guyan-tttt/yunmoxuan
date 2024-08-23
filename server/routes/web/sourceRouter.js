var express = require('express');
var router = express.Router();
const sourceController = require('../../controller/admin/source.js');

// 获取所有资源
router.get('/lists', sourceController.groupList);

module.exports = router;