const animationService = require('../../service/admin/animation.js')
const renameFile = require('../../utils/renameFile')
const dayjs = require('dayjs')

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
        const right = left + parseInt(pageSize)
        
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

        // 查询对应的动漫图片
        const imgList = await animationService.imgList(id)
        result.imgList = imgList
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
    }

}

module.exports = animationController