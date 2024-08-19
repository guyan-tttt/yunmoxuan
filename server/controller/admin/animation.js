const animationService = require('../../service/admin/animation.js')
const renameFile = require('../../utils/renameFile')

const animationController = {
    add: async(req,res) => {
        // 判断参数
        const { name,desc,type,hot,score,status,link} = req.body
        if(!name || !desc || !type || !hot || !score || !link) {
            res.json({
                code: 401,
                message: '参数错误'
            })
        }
        // 重命名文件
        const cover = renameFile(req.file,req.file.mimetype.split("/")[1])

        // 添加数据
        const result = await animationService.add({name,desc,type,hot,score,status,link,cover})
        res.send({
            code: 200,
            message: '添加成功'

        })
    }
}

module.exports = animationController