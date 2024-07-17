var express = require('express');
var router = express.Router();
const trendsController = require('../../controller/admin/trends')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/trends/' })

// 添加动态
router.post("/add",upload.array("files",9),trendsController.add)

module.exports =  router