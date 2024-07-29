var express = require('express');
var router = express.Router();
const indexController = require('../../controller/web/index')

// 获取作者信息
router.get('/user',indexController.user);

// 获取轮播图
router.get('/banner',indexController.banner);

// 获取分类列表
router.get('/category',indexController.category);

// 获取文章标签
router.get('/tag',indexController.tag);

module.exports = router; 