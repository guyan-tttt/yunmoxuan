const dashboardService = require('../../service/admin/dashboard')

const dashboardController = {
    statistics: async(req,res) => {
        const result = await dashboardService.statistics();
        res.send({
            code: 200,
            message: 'success',
            data: result
        });
    },
    notice: async(req,res) => {
        const result = await dashboardService.notice();
        res.send({
            code: 200,
            message: 'success',
            data: result
        });
    },
    addJournal: async(req,res) => {
        const { title, content }  = req.body
        if(!title || !content) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        const result = await dashboardService.addJournal(title, content);
        res.send({
            code: 200,
            message: '添加成功'
        })
    },
    journal: async(req,res) => {
        const { page, pageSize } = req.query
        if(!page || !pageSize) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        // 根据分页数据返回列表数据
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const result = await dashboardService.journal(left,right);
        res.send({
            code: 200,
            message: '获取成功',
            data: result
        });
    }
}

module.exports = dashboardController;