var express = require('express');
var router = express.Router();
const imageCategoryController = require('../../controller/admin/imageCategory')

// 添加相册分类
router.post('/add', imageCategoryController.add)

// 获取全部相册分类
router.get('/list',imageCategoryController.list)

// 修改分类名称
router.put('/update',imageCategoryController.update)

// 删除分类
router.delete('/del',imageCategoryController.del)

module.exports = router;