const imageService = require('../../service/admin/image')
const renameFile = require('../../utils/renameFile')
const dayjs = require('dayjs')

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
                updateTime: dayjs(Date.now()).format("YYYY-MM-DD")
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
    }
}
module.exports = imageController