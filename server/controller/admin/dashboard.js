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
    }
}

module.exports = dashboardController;