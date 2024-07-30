const articleService = require('../../service/admin/article')

const articleController = {
    getRecommends: async(req,res) => {
        const result = await articleService.getRecommends()
        console.log(result);
        res.send({
            code: 200,
            message: '获取成功',
            data: result
        })
    },
    getList: async(req,res) => {
        const { page,pageSize } = req.query
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const {data,total } = await articleService.getList(left,right)

        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        })
    },
    like: async(req,res) => {
        const { id } = req.query
        await articleService.like(id)
        res.send({
            code: 200,
            message: '点赞成功'
        })
    },
    getDetail: async(req,res) => {
        const { id }  = req.params
        const data = {}
        // 增加浏览量
        await articleService.addView(id)
        // 查询本条数据
        const result = await articleService.getArticleDetail(id)
        // 查询上一条和下一条数据
        const { prev , next }  = await articleService.getPrevAndNext(id,result.createTime)
        data.prev = prev
        data.next = next
        data.detail = result
        res.send({
            code: 200,
            message: '获取成功',
            data,
        })

    },
    addComment: async(req,res) => {
        const result = await articleService.addComment(req.body)
    }
}

module.exports = articleController;