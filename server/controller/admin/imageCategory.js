const imageCategoryService = require('../../service/admin/imageCategory')

const imageCategory = {
    add: async(req,res) => {

        const { name ,desc }  = req.body
        const data = {
            name,
            desc,
            createTime: Date.now(),
            updateTime: Date.now()
        }
        const result = await imageCategoryService.add(data)
        res.send({
            code: 200,
            message: '添加成功'
        })
    },
    list: async(req,res) => {
        const result = await imageCategoryService.list()
        res.send({
            code: 200,
            data: result
        })
    },
    update: async(req,res) => {
        const { id , name } = req.body

        const result = await imageCategoryService.update(id,name)

        res.send({
            code: 200,
            message: '修改成功'
        })
    },
    del: async(req,res) => {
        const { id } = req.query
        const result = await imageCategoryService.del(id)
        res.send({
            code: 200,
            message: '删除成功'
        })
    }
}

module.exports = imageCategory