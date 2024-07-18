var express = require('express');
var router = express.Router();
const trendsController = require('../../controller/admin/trends')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/trends/' })

// 添加动态
router.post("/add",upload.array("files",9),trendsController.add)

// 获取动态列表
router.get("/list",trendsController.list)

// 获取动态详情
router.get("/detail",trendsController.detail)

// 修改动态
router.put("/update",upload.array("files",9),trendsController.update)


module.exports =  router