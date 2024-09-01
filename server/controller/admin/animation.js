const animationService = require('../../service/admin/animation.js')
const renameFile = require('../../utils/renameFile')
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

const animationController = {
    add: async(req,res) => {
        // 判断参数
        const { name,desc,type,hot,score,status,link, remark} = req.body
        if(!name || !desc || !type || !hot || !score || !link || !remark) {
            res.json({
                code: 401,
                message: '参数错误'
            })
        }
        // 重命名文件
        const cover = renameFile(req.file,req.file.mimetype.split("/")[1])

        // 添加数据
        const result = await animationService.add({name,desc,type,hot,score,status,link,cover,remark})
        res.send({
            code: 200,
            message: '添加成功'

        })
    },
    list:async(req,res) => {
        const {page, pageSize } = req.query
        // 根据分页数据返回列表数据
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = parseInt(pageSize)
        console.log(left,right);
        const { data,total} = await animationService.list(left,right)
        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        })
    },
    detail: async(req,res) => {
        const { id } = req.query
        if(!id) {
            res.json({
                code: 401,
                message: '参数错误'
            })
        }
        // 查询动漫详情
        let  result = await animationService.detail(id)
        // 返回
        res.send({
            code: 200,
            message: '获取成功',
            data: result
        })
    },
    addImg: async(req,res) => {
        const fileList = []
        const { categoryID,categoryName } = req.body
        req.files.forEach(item => {
            const src = renameFile(item,item.mimetype.split("/")[1])
            fileList.push({
                src,
                name: item.originalname,
                categoryID,
                categoryName,
                createTime: dayjs(Date.now()).format("YYYY-MM-DD"),
                updateTime: dayjs(Date.now()).format("YYYY-MM-DD"),
                size: item.size
            })
        })
        // 添加图片
        const result = await animationService.addImg(fileList)
        res.send({
            code: 200,
            message: '添加成功'
        })
    },
    imgList: async(req,res) => {
        const { id, page,pageSize } = req.query
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = parseInt(pageSize)
        const { data,total} = await animationService.imgList(id,left,right)
        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        })
    },
    del: async(req,res) => {
        const { id } = req.query
        if(!id) {
            res.json({
                code: 401,
                message: '参数错误'
            })
        }
        // 查询当前动漫是否存在图片
        const { total } = await animationService.imgList(id,0,5)
        if(total > 0) {
            res.send({
                code: 201,
                message: '该动漫存在图片,请先将动漫所属图片清空'
            })
        } else {
            // 删除动漫
            const result = await animationService.del(id)
            res.send({
                code: 200,
                message: '删除成功'
            })
        }
    },
    update: async(req,res) => {
        let { name,desc,type,hot,score,status,link, remark, _id, deleteImg , cover} = req.body
        if(!name || !desc || !type || !hot || !score || !link || !remark || !_id) {
            res.json({
                code: 401,
                message: '参数错误'
            })
        }
        // 判断是否需要删除上一次的图片
        if(deleteImg) {
            // 删除图片
            const src = deleteImg.replace(process.env.SERVER_BASE_URL,"")
            fs.unlinkSync(path.join(__dirname,"../../public",src))
        }
        // 重命名新图片
        if(req.file) {
            cover = renameFile(req.file,req.file.mimetype.split("/")[1])
        } else {
            cover = cover.replace(process.env.SERVER_BASE_URL,"")
        }
        // 修改动漫
        const result = await animationService.update(_id,name,desc,type,hot,score,status,link, cover, remark)
        res.send({
            code: 200,
            message: '修改成功',
        })
        



    },
    delImg: async(req,res) => {
        const imgs = req.body
        if(!imgs) {
            res.json({
                code: 401,
                message: '参数错误'
            })
        }
        // 删除图片
        imgs.forEach(item => {
            const src = item.src.replace(process.env.SERVER_BASE_URL,"")
            fs.unlinkSync(path.join(__dirname,"../../public",src))
        })
        // 删除图片记录
        const result = await animationService.delImg(imgs.map((item) => item.id))
        res.send({
            code: 200,
            message: '删除成功'
        })
    }

}

module.exports = animationController