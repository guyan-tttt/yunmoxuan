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

// 获取日志列表
router.get('/journal',indexController.journal);

// 添加访问记录
router.post('/visit',indexController.addVisit);

module.exports = router; 