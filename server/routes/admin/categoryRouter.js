var express = require('express');
var router = express.Router();
const categoryController = require('../../controller/admin/category')

// 添加分类
router.post('/add', categoryController.addCategory)

// 获取分类列表
router.get('/list',categoryController.getCategoryList)

// 更新分类
router.put('/update',categoryController.updateCategory)

// 删除分类
router.delete('/del',categoryController.delCategory)

// 获取全部分类
router.get('/all',categoryController.getAllCategory)

module.exports = router;
