var express = require('express');
var router = express.Router();

const articleController = require('../../controller/web/article')

// 获取推荐文章
router.get('/recommends',articleController.getRecommends)

// 获取全部文章
router.get('/list',articleController.getList)

// 获取文章详情
// router.get('/detail/:id',articleController.getDetail)

// 点赞
router.post('/like',articleController.like)

module.exports = router;