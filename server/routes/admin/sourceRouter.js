var express = require('express');
var router = express.Router();
const sourceController = require('../../controller/admin/source.js');

// 添加资源分组
router.post('/addGroup', sourceController.addGroup);

// 获取分组列表
router.get('/groupList', sourceController.groupList);

// 添加资源
router.post('/addSource', sourceController.addSource);

// 更新资源
router.put('/updateSource', sourceController.updateSource);

// 刪除资源
router.delete('/delSource/:id', sourceController.delSource);

// 更新分组
router.put('/updateGroup', sourceController.updateGroup);

// 刪除分组
router.delete('/delGroup/:id', sourceController.delGroup);

module.exports = router;

