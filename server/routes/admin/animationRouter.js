var express = require('express');
var router = express.Router();
const animationController = require('../../controller/admin/animation')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/animation/' })

// 添加动漫
router.post('/add', upload.single('file'), animationController.add)

// 获取动漫数据
router.get('/list', animationController.list)

// 获取动漫详情
router.get('/detail', animationController.detail)

// 更新动漫
router.put('/update', upload.single('file'), animationController.update)

// 删除动漫
router.delete('/del', animationController.del)

// 添加动漫图片
router.post('/addImg', upload.array('files',10), animationController.addImg)

// 获取图片信息
router.get('/imgList', animationController.imgList)

// 删除动漫图片
// router.post('/deleteImg', animationController.delImg)



module.exports = router;