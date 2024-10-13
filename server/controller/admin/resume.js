const resumeService = require('../../service/admin/resume')
const renameFile = require("../../utils/renameFile")

const resumeController = {
    add: async(req,res) => {
        // 1.判断参数是否为空
        const { photo } = req.body
        if(!req.file) {
            if(!photo) {
                return res.status(401).send({
                    code: 401,
                    message: '请上传图片'
                })
            }
            
        } else {
            req.body.photo = renameFile(req.file,req.file.mimetype.split("/")[1])
        }

        const result = await resumeService.add(req.body)
        console.log(req.body);
        

        res.send({
            code: 200,
            message: '上传成功',
            data: {
                result
            }
        })

    }
}

module.exports = resumeController