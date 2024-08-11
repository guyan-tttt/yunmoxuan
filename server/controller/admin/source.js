const sourceService = require('../../service/admin/source');



const sourceController = {
    addGroup: async(req,res) => {
        // 判断参数
        const { name,desc,logo } = req.body;
        if(!name || !desc || !logo) {
            return res.json({ code: 400, message: '参数错误' });
        }
        await sourceService.addGroup({
            name,desc,logo
        });
        // 添加数据
         res.send({
             code: 200,
             message: '添加成功'
         })
    },
    groupList: async(req,res) => {
        const list = await sourceService.groupList();
        res.send({
            code: 200,
            message: '获取成功',
            data: list
        })
    },
    addSource: async(req,res) => {
        // 判断参数
        const { name,desc,logo,groupId,groupName, link,bg } = req.body
        if( !name || !desc || !logo || !groupId || !groupName || !link || !bg)  {
            return res.json({ code: 400, message: '参数错误' });
        }
        await sourceService.addSource({
            name,desc,logo,groupId,groupName, link,bg
        });

        res.send({
            code: 200,
            message: '添加成功'
        })
    },
    updateSource: async(req,res) => {
        const { _id,name,desc,logo,groupId,groupName, link,bg } = req.body
        if( !_id || !name || !desc || !logo || !groupId || !groupName || !link || !bg)  {
            return res.json({ code: 400, message: '参数错误' });
        }
        await sourceService.updateSource({
            _id,name,desc,logo,groupId,groupName, link,bg
        });
        res.send({
            code: 200,
            message: '修改成功'
        })
    },
    delSource: async(req,res) => {
        const { id } = req.params
        if(!id) {
            res.json({ code: 400, message: '参数错误' });
        }
        await sourceService.delSource(id);
        res.send({
            code: 200,
            message: '删除成功'
        })
    },
    updateGroup: async(req,res) => {
        const { _id,name,desc,logo} = req.body
        if( !_id || !name || !desc || !logo)  {
            return res.json({ code: 400, message: '参数错误' });
        }
        await sourceService.updateGroup({
            _id,name,desc,logo
        });
        res.send({
            code: 200,
            message: '修改成功'
        })
    },
    delGroup: async(req,res) => {
        const { id } = req.params
        if(!id) {
            res.json({ code: 400, message: '参数错误' });
        }
        // 查询当前分组下是否有数据
        const source = await sourceService.findSource(id);
        if(source.length > 0) {
            return res.send({ code: 201, message: '当前分组下有数据，不能删除' });
        } else {
            await sourceService.delGroup(id);
            res.send({
                code: 200,
                message: '删除成功'
            })
        }
    },
}

module.exports = sourceController;