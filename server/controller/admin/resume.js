const resumeService = require('../../service/admin/resume')
const renameFile = require("../../utils/renameFile")
const imageService = require('../../service/admin/image')
const fs = require('fs')
const path = require('path')

const resumeController = {
    add: async(req,res) => {
        // 1.判断参数是否为空
        const { photo } = req.body

        if(!req.file) {
            req.body.photo = photo.replace(process.env.SERVER_BASE_URL, "")
            
        } else {
            req.body.photo = renameFile(req.file,req.file.mimetype.split("/")[1])
        }
        // 判断当前是否已经存在新数据，如果存在就需要删除phtoto
        const data = await resumeService.detail()
        if(data) {
            if(data.photo) {
                const url = data.photo.replace(process.env.SERVER_BASE_URL, "")
                fs.unlinkSync(path.join(__dirname, '../../public', url))
            }
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
    },
    deleteEducation: async(req,res) => {
        const index = req.query.index
        const id = req.query.id

        // 查询对应的数据并删除图片
        const data = await resumeService.educationByIndex(id,index)
        // 删除对应的图片
        if(data.logo) {
            fs.unlinkSync(path.join(__dirname, '../../public', data.logo))
        }
        const result = await resumeService.deleteEducation(id,data)
        res.send({
            code: 200,
            message: '删除成功',
            data
        })
    },
    addSkill: async(req,res) => {
        if(!req.body.id || !req.body.value) {
            return  res.status(400).send({
                code: 400,
                message: '参数错误'
            })
            
        }

        const result = await resumeService.addSkill(req.body)
        res.send({
            code: 200,
            message: '添加成功'
        })
        
    },
    skill: async(req,res) => {
        const { id } = req.query
        if(!id) {
            return req.status(400).send({
                code: 400,
                message: '参数错误'
            })
        }
        const result = await resumeService.skill(id)

        res.send({
            code: 200,
            message: '查询成功',
            data: result
        })
    },
    deleteSkill: async(req,res) => {
        const { id, value } = req.query
        if(!id || !value) {
            return res.status(400).send({
                code: 400,
                message: '参数错误'
            })
        }
        const result = await resumeService.deleteSkill(id,value)
        res.send({
            code: 200,
            message: '删除成功'
        })
    },
    addProject: async(req,res) => {
        let {
            name,
            link,
            bgImg,
            logo,
            desc,
            time,
            content
        } = req.body
        console.log(req.body);
        if(!name || !bgImg || !desc || !time  || !content) {
            return res.status(400).send({
                code: 400,
                message: '参数错误'
            })
        }
        if(req.file) {
            logo = renameFile(req.file,req.file.mimetype.split("/")[1])
        } 
        console.log(req.file);
        const data = {
            name,
            link,
            bgImg,
            logo,
            desc,
            start_time: time.split(",")[0],
            end_time: time.split(",")[1],
            content
        }
        const result = await resumeService.addProject(data)
        res.send({
            code: 200,
            message: '添加成功'
        })
    },
    project: async(req,res) => {
        const list = await resumeService.project()
        res.send({
            code: 200,
            message: '查询成功',
            data: list
        })
    },
    deleteProject: async(req,res) => {
        const { id } = req.query
        if(!id) return res.status(400).send({
            code: 400,
            message: '参数错误'
        })
        const data = await resumeService.projectById(id)
        if(data.logo) {
            const src = data.logo.replace(process.env.SERVER_BASE_URL, "")
            fs.unlinkSync(path.join(__dirname, '../../public',src))
        }
        // 查询所有的数据并删除对应的图片
        const list = await imageService.list(id)
        list.forEach(item => {
            const src = item.src.replace(process.env.SERVER_BASE_URL, "")
            fs.unlinkSync(path.join(__dirname, '../../public', src))
            console.log(src);
        })
        const result = await resumeService.deleteProject(id)
        res.send({
            code: 200,
            message: '删除成功'
        })
    },
    projectDetail: async(req,res) => {
        const { id } = req.query
        if(!id) return res.status(400).send({
            code: 400,
            message: '参数错误'
        })
        const result = await resumeService.projectById(id)
        res.send({
            code: 200,
            message: '查询成功',
            data: result
        })

    },
    updateProject: async(req,res) => {
        let { id, name, link,bgImg, logo,desc, time,content } = req.body
        if(!id || !name || !bgImg || !desc || !time  || !content) {
            return res.status(400).send({
                code: 400,
                message: '参数错误'
            })
        }
        if(req.file) {
            // 查询当前的图片并删除
            const data = await resumeService.projectById(id)
            if(data.logo) {
                const src = data.logo.replace(process.env.SERVER_BASE_URL, "")
                fs.unlinkSync(path.join(__dirname, '../../public', src))
            }
            logo = renameFile(req.file,req.file.mimetype.split("/")[1])
        } else {
            logo = logo.replace(process.env.SERVER_BASE_URL, "")
        }
        const data = {
            id,
            name,
            link,
            bgImg,
            logo,
            desc,
            start_time: time.split(",")[0],
            end_time: time.split(",")[1],
            content
        }
        const result = await resumeService.updateProject(data)
        res.send({
            code: 200,
            message: '修改成功',
            data
        })
    },
    uploadProjectImage: async(req,res) => {
        const { projectId } = req.body
        const imgs  = req.files.map(item => {
            return {
                name: "项目截图",
                src: renameFile(item, item.mimetype.split("/")[1]),
                categoryID: projectId,
                categoryName: "项目截图",
                createTime: new Date(),
                updateTime: new Date()
            }
        })
        const result = await resumeService.uploadProjectImage(imgs)
        res.send({
            code: 200,
            message: '上传成功'
        })
    },
    projectImage: async(req,res) => {
        const { projectId }  = req.query
        if(!projectId) return res.status(400).send({
            code: 400,
            message: '参数错误'
        })

        const result = await imageService.list(projectId)
        res.send({
            code: 200,
            message: '查询成功',
            data: result
        })
    },
    deleteImgList: async(req,res) => {
        const { imgList } = req.body
        if(!imgList | imgList.length === 0) return res.status(400).send({
            code: 400,
            message: '参数错误'
        })
        // 获取删除的图片的路径
        const imgSrc = await imageService.getSrcByIds(imgList)
        // 删除图片
        imgSrc.forEach(item => {
            fs.unlinkSync(path.join(__dirname, '../../public', item.src))
        })
        // 删除数据库中的图片
        await imageService.deleteImgList(imgList)

        res.send({
            code: 200,
            message: '删除成功'
        })

    }
}

module.exports = resumeController