var express = require('express');
var router = express.Router();
const dashboardController = require('../../controller/admin/dashboard');

// 获取首页统计数据
router.get('/statistic', dashboardController.statistics);

// 获取通知公告数据
router.get('/notices', dashboardController.notice);

// 添加系统日志
router.post('/journal', dashboardController.addJournal)

// 获取系统日志
router.get('/journals', dashboardController.journal)

// 删除日志
router.delete('/journal/:id', dashboardController.delJournal)

// 阅读日志
router.put("/journal/:id", dashboardController.readJournal)

// 获取通知消息
router.get('/messages', dashboardController.message)

// 阅读消息
router.put("/message/:id", dashboardController.readMessage)


module.exports = router;