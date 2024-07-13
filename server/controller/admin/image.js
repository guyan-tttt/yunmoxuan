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
    }
}
module.exports = imageController