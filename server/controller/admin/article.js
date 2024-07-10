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
        const {page, pageSize,articleType} = req.query
        // 根据分页数据返回列表数据
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const {data: result,total} = await articleService.getArticleList(left,right,parseInt(articleType))

        res.send({
            code: 200,
            message: '获取分类列表成功',
            data: result,
            total: total,
        })
          
    },
    getArticleDetail: async(req,res) => {
        const {id} = req.query
        // 根据分类id获取分类详情
        const result = await articleService.getArticleDetail(id)
        res.send({
            code: 200,
            message: '获取文章详情成功',
            data: result
        })
    },
    updateArticle: async(req,res) => {
        if(req.file) {
            // 处理文件路径重命名
            const cover = renameFile(req.file,req.file.mimetype.split("/")[1] )
            req.body.cover = cover
        } else {
            req.body.cover = req.body.cover.replace("http://localhost:3000","")
        }
       const result = await articleService.updateArticle(req.body)
        res.send({
            code: 200,
            message: '更新文章成功',
            data: req.body
        })
    },
    delArticle: async(req,res) => {
        const { id }  = req.params
        const result = await articleService.delArticle(id)
        res.send({
            code: 200,
            message: '删除文章成功',
        })
    },
    changePublish: async(req,res) => {
        const { id ,isPublish } = req.body
        const result = await articleService.changePublish(id,isPublish)
        res.send({
            code: 200,
            message: '发布状态切换成功',      
          })
    },
    searchArticle: async(req,res) => {
        const { page,pageSize, tagsID ,categoryID,articleType } = req.query
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const result = await articleService.searchArticle(tagsID ,categoryID,parseInt(articleType))
       console.log(result.length);
        let data = []
        if(result.length > 0) {
            result.forEach((item) => {
                for(let i  = 0; i < item.tags.length; i++) {
                    if(item.tags[i].id == tagsID) {
                        data.push(item);
                    }
                } 
                return false
            })
        }
        res.send({
            code: 200,
            message: '获取文章列表成功',
            data: data,
        })
    },
    delArticleRecover: async(req,res) => {
        const { id } = req.params
        const result = await articleService.delArticleRecover(id)
        res.send({
            code: 200,
            message: '恢复成功',   
        })
    },
    delArticlePermanently: async(req,res) => {
        const { id } = req.params
        const result = await articleService.delArticlePermanently(id)

        res.send({
            code: 200,
            message: '彻底删除成功',   
        })
    },
    delArticleAll: async(req,res) => {
        const { ids } = req.body
        console.log(ids);
        const result = await articleService.delArticleAll(ids)
        res.send({
            code: 200,
            message: '批量删除成功',          
        })
    }

   
}

module.exports = articleController