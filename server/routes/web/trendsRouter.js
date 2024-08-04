var express = require('express');
var router = express.Router();
var trendsController = require('../../controller/web/trends');

// 获取动态列表
router.get('/list', trendsController.getTrends);

// 获取评论列表
router.get('/comment/list', trendsController.getTrendsComments);

// 添加评论
router.post('/comment/add', trendsController.addTrendsComment);

// 点赞动态
router.post('/like', trendsController.addTrendsLike);

module.exports = router;