
const trendsService = require('../../service/admin/trends')
const renameFile = require('../../utils/renameFile')
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

const trendsController = {
    add: async(req,res) => {
        const { content,userID } = req.body
        const imgList = []
        req.files.forEach(item => {
            const src = renameFile(item,item.mimetype.split("/")[1])
            imgList.push(src)
        })
        
        // 添加数据库
        const result = await trendsService.add(content,userID,imgList)
        res.send({
            code: 200,
            msg: '添加成功',
        })
    },
    list: async(req,res) => {
        const { page , pageSize } = req.query
        const left = 0
        const right = parseInt(page) *  parseInt(pageSize)
        const result = await trendsService.list()
        const total = result.length
        const data = result.slice(left,right)
        res.send({
            code: 200,
            message: '获取成功',
           data,
           total
        })
    },
    detail: async(req,res) => {
        const { id } = req.query
        const result = await trendsService.detail(id)
        res.send({
            code: 200,
            message: '获取成功',
            data: result
        })
    },
    update: async(req,res) => {
        const {_id, content } = req.body
        // 1.解析body,首先挂载原来的图片
        console.log(req.body)
        let imgList = []
        if(req.body.imgList.length > 0) {
            imgList = req.body.imgList.split(',').map(item => {
                return item.replace(process.env.SERVER_BASE_URL,"")
            })
        }
        // 2.重命名文件，挂载文件图片
        req.files.forEach(item => {
            const src = renameFile(item,item.mimetype.split("/")[1])
            imgList.push(src)
        })
        // 3.删除原来的需要删除图片
        const delList = req.body.delImgList.split(",")
        if(delList.length > 0 && delList[0] != "") {
            delList.forEach(item => {
                const src = item.replace(process.env.SERVER_BASE_URL,"")
                try {
                    fs.unlinkSync(path.join(__dirname,"../../public",src))
                } catch(err) {
                    console.log(err)
                }
            })
        }
        // 4.更新数据库
        const result = await trendsService.update(_id,content,imgList)
        
        res.send({
            code: 200,
            message: '更新成功'
        })
    },
    del: async(req,res) => {
        const { id }  = req.query
        const result = await trendsService.detail(id)
        const imgList = result.imgList
        // console.log(imgList)
        // 删除图片
        if(imgList.length > 0) {
            imgList.forEach(item => {
                const src = item.replace(process.env.SERVER_BASE_URL,"")
                try {
                    fs.unlinkSync(path.join(__dirname,"../../public",src))
                } catch(err) {
                    console.log(err)
                }
            })
        }
        // 删除数据库
        await trendsService.del(id)
        res.send({
            code: 200,
            message: '删除成功'
        })
    },
    browse: async(req,res) => {
        const { id } = req.query
        const result = await trendsService.browse(id)
        res.send({
            code: 200,
            message: '浏览成功',
        })
    },
    like: async(req,res) => {
        const { id } = req.query
        const result = await trendsService.like(id)
        res.send({
            code: 200,
            message: '点赞成功',
        })
    },
    comment: async(req,res) => {
        if(req.body.ip === "") {
            req.body.ip = "未知"
        }
        // 添加评论
        const result = await trendsService.comment(req.body)
        res.send({
            code: 200,
            message: '评论成功',
        })
    },
    commentList: async(req,res) => {
         const {  page,pageSize,trendsID } = req.query
         const left = 0
         const right = parseInt(page) *  parseInt(pageSize)
         const result = await trendsService.commentList(trendsID,left,right)
         
         res.send({
             code: 200,
             message: '获取成功',
             data: result
         })
    },
    commentDel: async(req,res) => {
        const { id } = req.query
        await trendsService.commentDel(id)
        
        res.send({
            code: 200,
            message: '删除成功'
        })
    }
}

module.exports = trendsController;