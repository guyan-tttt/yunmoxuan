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
    }
}

module.exports = articleController;