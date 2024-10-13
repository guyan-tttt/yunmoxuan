var express = require('express');
var router = express.Router();
const resumeController = require('../../controller/admin/resume')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/resume/' })

// 添加简历  / 修改简历
router.post("/add", upload.single('file'), resumeController.add)

module.exports = router;