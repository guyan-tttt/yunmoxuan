// 标签管理相关路由

var express = require('express');
var router = express.Router();
const tagsController = require('../../controller/admin/tags')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/tags/' })

// 添加标签
router.post('/add',upload.single("file") ,tagsController.addTag)

// 获取标签列表
router.get('/list',tagsController.getTagList)

// 修改标签数据
router.put('/update',upload.single("file"),tagsController.updateTag)

// 删除标签
router.delete('/del',tagsController.delTag)

module.exports = router;