const guestbookService = require('../../service/web/guestbook.js');

const guestbookController = {
    add: async(req,res) => {
        req.body.os = req.headers['user-agent'].split("(")[1].split(")")[0].split(";")[0]
        const result = await guestbookService.add(req.body);
        res.send( {
            code: 200,
            message: 'success',
        })
    },
    getList: async(req,res) => {
        const { page,pageSize } = req.query;
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = parseInt(pageSize)
        const { data,total } = await guestbookService.getList(left,right);
        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        })
    }
}

module.exports = guestbookController;