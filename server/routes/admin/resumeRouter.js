var express = require('express');
var router = express.Router();
const resumeController = require('../../controller/admin/resume')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/resume/' })

// 添加简历  / 修改简历
router.post("/add", upload.single('file'), resumeController.add)

// 获取简历详情
router.get("/detail", resumeController.detail)

// 添加教育经历
router.post("/addEducation", upload.single('file'),resumeController.addEducation)

// 获取教育经历
router.get("/education", resumeController.education)

// 删除教育经历
router.delete("/deleteEducation", resumeController.deleteEducation)

module.exports = router;