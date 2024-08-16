const dashboardService = require('../../service/admin/dashboard')
const websocket = require('../../websocket/app')
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
        // 通知前端立刻更新列表数据
        websocket.broadcast(JSON.stringify({ type: 'newLog',message: '更新日志' }));
        res.send({
            code: 200,
            message: '添加成功'
        })
    },
    journal: async(req,res) => {
        const { page, pageSize , view} = req.query
        if(!page || !pageSize) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        // 根据分页数据返回列表数据
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const { data, total} = await dashboardService.journal(left,right,view);
        
        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        });
    },
    delJournal: async (req,res) => {
        const { id } = req.params
        if(!id) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        await dashboardService.delJournal(id);
        // 通知前端立刻更新列表数据
        websocket.broadcast(JSON.stringify({ type: 'newLog',message: '更新日志' }));
        res.send({
            code: 200,
            message: '删除成功'
        });
    },
    readJournal: async(req,res) => {
        const { id }  = req.params
        if(!id) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        const result = await dashboardService.readJournal(id);
        res.send({
            code: 200,
            message: '阅读成功',
        });
    },
    message: async(req,res) => {
        const { page, pageSize , view} = req.query
        if(!page || !pageSize) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        // 根据分页数据返回列表数据
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const { data, total} = await dashboardService.message(left,right,view);
        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        });
    },
    readMessage: async(req,res) => {
        const { id } = req.params
        if(!id) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        const result = await dashboardService.readMessage(id);
        res.send({
            code: 200,
            message: '阅读成功',
        });
    }
}

module.exports = dashboardController; 