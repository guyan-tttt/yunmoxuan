var express = require('express');
var router = express.Router();
const animationController = require('../../controller/admin/animation')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/animation/' })

// 添加动漫
router.post('/add', upload.single('file'), animationController.add)

module.exports = router;