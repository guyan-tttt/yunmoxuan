const articleService = require('../../service/admin/article')
const renameFile = require('../../utils/renameFile')

const articleController = {
    addArticle: async(req,res) => {
        // 处理文件路径重命名
        const cover = renameFile(req.file,req.file.mimetype.split("/")[1] )
        req.body.cover = cover
        const result = await articleService.addArticle(req.body)
        res.send({
            code: 200,
            msg: '添加成功',
            data: result
        })
    },
    getArticleList: async(req,res) => {
        const {page, pageSize} = req.query
        // 根据分页数据返回列表数据
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const {data: result,total} = await articleService.getArticleList(left,right)

        res.send({
            code: 200,
            message: '获取分类列表成功',
            data: result,
            total: total,
        })
          
    }

   
}

module.exports = articleController