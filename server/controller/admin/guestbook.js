const guestbookService = require('../../service/admin/guestbook.js');

const guestbookController = {

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
    },
    delete: async(req,res) => {
        const { id } = req.params;
        await guestbookService.delete(id);
        res.send({
            code: 200,
            message: '删除成功',
        })
    }
}

module.exports = guestbookController;