const articleService = require('../../service/admin/article')
const dashboardService = require('../../service/admin/dashboard')
const websocket = require('../../websocket/app')
const articleController = {
    getRecommends: async(req,res) => {
        console.log(111);
        const result = await articleService.getRecommends()
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
        // 添加消息
        const title = req.body.nickname + '评论了你的文章'
        const content = req.body.content
        await dashboardService.addMessage(title,content)
        // 发送消息通知前端更新消息通知
        websocket.broadcast(JSON.stringify({ type: 'newMessage',message: '更新消息' }));
        res.send({
            code: 200,
            message: '评论成功',
        })
    },
    getCommentList: async(req,res) => {
        const { id } = req.params
        const { page ,pageSize } = req.query
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        let { data,total } = await articleService.getCommentList(id,left ,right )
        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        })
    },
    search: async(req,res) => {
        const { keyword } = req.query
        const data = await articleService.search(keyword)
        res.send({
            code: 200,
            message: '获取成功',
            data
        })
    }
}

module.exports = articleController;