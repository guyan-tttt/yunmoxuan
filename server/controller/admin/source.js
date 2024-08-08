const sourceService = require('../../service/admin/source');



const sourceController = {
    addGroup: async(req,res) => {
        // 判断参数
        const { name,desc,logo } = req.body;
        if(!name || !desc || !logo) {
            return res.json({ code: 400, msg: '参数错误' });
        }
        await sourceService.addGroup({
            name,desc,logo
        });
        // 添加数据
         res.send({
             code: 200,
             msg: '添加成功'
         })
    },
    groupList: async(req,res) => {
        const list = await sourceService.groupList();
        res.send({
            code: 200,
            msg: '获取成功',
            data: list
        })
    }
}

module.exports = sourceController;