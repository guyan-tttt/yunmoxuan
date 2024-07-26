var express = require('express');
var router = express.Router();
const indexController = require('../../controller/web/index')
// 获取作者信息
router.get('/user',indexController.user);

module.exports = router; 