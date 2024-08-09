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
    },
    addSource: async(req,res) => {
        // 判断参数
        const { name,desc,logo,groupId,groupName, link,bg } = req.body
        if( !name || !desc || !logo || !groupId || !groupName || !link || !bg)  {
            return res.json({ code: 400, msg: '参数错误' });
        }
        await sourceService.addSource({
            name,desc,logo,groupId,groupName, link,bg
        });

        res.send({
            code: 200,
            message: '添加成功'
        })
    }
}

module.exports = sourceController;