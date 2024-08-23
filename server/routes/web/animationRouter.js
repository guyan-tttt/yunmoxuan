var express = require('express');
var router = express.Router();
const animationController = require('../../controller/admin/animation')


// 获取动漫数据
router.get('/list', animationController.list)

// 获取动漫详情
router.get('/detail', animationController.detail)

// 获取图片信息
router.get('/imgList', animationController.imgList)



module.exports = router;