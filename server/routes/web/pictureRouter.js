var express = require('express');
var router = express.Router();
var pictureController = require('../../controller/web/picture.js');

// 获取照片分类
router.get("/category",pictureController.getCategory)

// 获取照片列表
router.get('/list/:id',pictureController.getList)


module.exports = router