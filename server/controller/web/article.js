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
    }
}

module.exports = articleController;