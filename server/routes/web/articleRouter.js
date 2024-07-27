var express = require('express');
var router = express.Router();

const articleController = require('../../controller/web/article')
// 获取推荐文章
router.get('/recommends',articleController.getRecommends)

module.exports = router;