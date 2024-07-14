var express = require('express');
var router = express.Router();
const imageController = require('../../controller/admin/image')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/image/' })

// 添加图片
router.post('/upload', upload.array('files',12),imageController.upload);

// 获取图片列表
router.get('/list',imageController.list);
module.exports = router;