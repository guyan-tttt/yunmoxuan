const trendsService = require('../../service/admin/trends')

const trendsController = {
    getTrends: async(req,res) => {
        const { page ,pageSize } = req.query
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        // 获取动态列表
        const result = await trendsService.list()
        const data = result.slice(left, right)
        // 增加每一个动态的浏览数
        
        res.send({
            code: 200,
            message: '获取成功',
            data,
            total: result.length
        })
    },
    getTrendsComments: async(req,res) => {
        const {  page,pageSize,trendsID } = req.query
         const left = 0
         const right = parseInt(page) *  parseInt(pageSize)
         const { data,total } = await trendsService.commentList(trendsID,left,right)
         
         res.send({
             code: 200,
             message: '获取成功',
             data: data,
             total: total
         })
    },
    addTrendsComment: async(req,res) => {
        if(req.body.ip === "") {
            req.body.ip = "未知"
        }
        // 添加评论
        const result = await trendsService.comment(req.body)
        res.send({
            code: 200,
            message: '评论成功',
        })
    },
    addTrendsLike: async(req,res) => {
        const { id } = req.query
  
        const result = await trendsService.like(id)
        res.send({
            code: 200,
            message: '点赞成功',
        })
    }
}

module.exports = trendsController;