var express = require('express');
var router = express.Router();
const sourceController = require('../../controller/admin/source.js');

// 添加资源分组
router.post('/addGroup', sourceController.addGroup);

// 获取分组列表
router.get('/groupList', sourceController.groupList);

module.exports = router;

