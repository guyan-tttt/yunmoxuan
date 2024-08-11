var express = require('express');
var router = express.Router();
const dashboardController = require('../../controller/admin/dashboard');

// 获取首页统计数据
router.get('/statistics', dashboardController.statistics);

// 获取通知公告数据
router.get('/notice', dashboardController.notice);

// 添加系统日志
router.post('/journal', dashboardController.addJournal)

// 获取系统日志
router.get('/journal', dashboardController.journal)
module.exports = router;