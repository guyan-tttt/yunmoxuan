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

// 添加专业技能
router.post("/addSkill", resumeController.addSkill)

// 获取专业技能
router.get("/skill", resumeController.skill)

// 删除专业技能
router.delete("/deleteSkill", resumeController.deleteSkill)

// 添加项目经验
router.post("/addProject", upload.single('file'), resumeController.addProject)

// 获取项目经验
router.get("/project", resumeController.project)

// 删除项目经验
router.delete("/deleteProject", resumeController.deleteProject)

module.exports = router;