var express = require('express');
var router = express.Router();
const dashboardController = require('../../controller/admin/dashboard');

// 获取首页统计数据
router.get('/statistics', dashboardController.statistics);

// 获取通知公告数据
router.get('/notice', dashboardController.notice);

module.exports = router;