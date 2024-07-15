const { log } = require('console')
const imageService = require('../../service/admin/image')
const renameFile = require('../../utils/renameFile')
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

const imageController = {
    upload: (req,res) => {
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
        
        const result = imageService.upload(fileList)

        res.send({
            code: 200,
            msg: '上传成功',
        })
    },
    list: async(req,res) => {
        const { page, pageSize,type } = req.query
        const left = 0
        const right = parseInt(page) *  parseInt(pageSize)
        const result = await imageService.list(type)
        const data = result.slice(left,right)
        res.send({
            code: 200,
            msg: '获取成功',
            data,
            total:  result.length
        })
    },
    del: async(req,res) => {
        const { id } = req.params
        // 删除当前文件并返回文件信息
        const result = await imageService.del(id)
        // 删除文件
        fs.unlinkSync(path.join(__dirname,"../../public",result.src))
        res.send({
            code: 200,
            msg: '删除成功'
        })
    },
    download: async(req,res) => {
        const { id } = req.params

        const result = await imageService.download(id)
        const filePath = path.join(__dirname, "../../public",result.src);

        // 读取文件
        const data = fs.readFileSync(filePath)
         // 设置响应头，指定内容类型和文件名
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="image1.jpg"');

        // 发送文件数据
        res.send(data)

    }
}
module.exports = imageController