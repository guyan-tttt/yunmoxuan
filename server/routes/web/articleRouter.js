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

// 查询文章详情
router.get('/detail/:id',articleController.getDetail)

// 添加文章评论
router.post('/comment',articleController.addComment)

// 获取文章评论列表
router.get('/comment/list/:id',articleController.getCommentList)

// 搜索文章
router.get('/search',articleController.search)
module.exports = router;