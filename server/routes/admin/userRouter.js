var express = require('express');
var router = express.Router();
const userController = require('../../controller/admin/user')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/user/' })

// 登录接口
router.post('/login', userController.login)

// 获取用户个人信息
router.get('/userInfo', userController.getUserInfo)

// 修改个人信息
router.post('/update', upload.single("file"),userController.updateUserInfo)
module.exports = router;