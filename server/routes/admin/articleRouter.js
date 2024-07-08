var express = require('express');
var router = express.Router();
const articleController = require('../../controller/admin/article')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/article/' })

// 添加文章
router.post('/add',upload.single("file"),articleController.addArticle)

// 获取文章列表
router.get('/list',articleController.getArticleList)
module.exports = router;