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
    },
    addEducation: async(req,res) => {
        if(req.file) {
            req.body.logo = renameFile(req.file,req.file.mimetype.split("/")[1])
        }
        req.body.time = req.body.time.split(",")
        const education = {
            
            name: req.body.name,
            major: req.body.major,
            logo: req.body.logo,
            start_time: req.body.time[0],
            end_time: req.body.time[1],
            desc: req.body.desc,
            bg: req.body.bgImg,
            resume_id: req.body.resumeId
        }
        const result = await resumeService.addEducation(education)
        res.send({
            code: 200,
            message: '添加成功'
        })
    },
    education: async(req,res) => {
        const { id } = req.query
        if(!id) {
            res.send({
                code: 402,
                message: '参数错误'
            })
        }
        const result = await resumeService.education(id)
        res.send({
            code: 200,
            message: '查询成功',
            data: result
        })
    }
}

module.exports = resumeController