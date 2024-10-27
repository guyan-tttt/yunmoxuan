var express = require('express');
var router = express.Router();
var resumeController = require('../../controller/admin/resume');

// 获取简历信息
router.get("/detail", resumeController.getWebResumeDetail)

// 获取项目详情
router.get("/project/detail", resumeController.projectDetail)

// 获取项目图片
router.get("/project/image", resumeController.projectImage)

module.exports = router