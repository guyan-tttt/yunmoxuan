const resumeService = require('../../service/admin/resume')
const renameFile = require("../../utils/renameFile")

const resumeController = {
    add: async(req,res) => {
        // 1.判断参数是否为空
        const { photo } = req.body

        if(!req.file) {
            req.body.photo = photo.replace(process.env.SERVER_BASE_URL, "")
            
        } else {
            req.body.photo = renameFile(req.file,req.file.mimetype.split("/")[1])
        }
        // console.log(req.body);
        const result = await resumeService.add(req.body)

        res.send({
            code: 200,
            message: '上传成功',
            data: {
                // result
            }
        })

    },
    detail: async(req,res) => {
        const result = await resumeService.detail()
        res.send({
            code: 200,
            message: '查询成功',
            data: result
        })
    }
}

module.exports = resumeController