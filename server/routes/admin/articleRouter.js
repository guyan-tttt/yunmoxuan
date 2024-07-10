var express = require('express');
var router = express.Router();
const articleController = require('../../controller/admin/article')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/article/' })

// 添加文章
router.post('/add',upload.single("file"),articleController.addArticle)

// 获取文章列表
router.get('/list',articleController.getArticleList)

// 获取文章详情
router.get('/detail',articleController.getArticleDetail)

// 更新文章
router.put('/update',upload.single("file"),articleController.updateArticle)

// 删除文章
router.delete('/del/:id',articleController.delArticle)

// 切换发布状态
router.put('/publish',articleController.changePublish)

// 搜索文章
router.get('/search',articleController.searchArticle)

// 删除文章恢复
router.delete('/recover/:id',articleController.delArticleRecover)

// 完全删除
router.delete('/delArticle/:id',articleController.delArticlePermanently)

// 批量删除
router.post('/delAll',articleController.delArticleAll)

module.exports = router;