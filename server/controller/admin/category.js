const categoryService = require('../../service/admin/category')

const categoryController = {
    addCategory: async(req,res) => {

        const result = await categoryService.addCategory(req.body)
        if(result._id) {
            res.send({
                code: 200,
                message: '添加分类成功',
                data: result
            })
        }
        
    },
    getCategoryList: async(req,res) => {
        const { page,pageSize } = req.query
        // 获取分类列表
        const result = await categoryService.getCategoryList()
        if(result.length) {
            
            // 根据分页数据返回列表数据
            const left = (parseInt(page) - 1) * parseInt(pageSize)
            const right = left + parseInt(pageSize)
            const total = result.length
            const data = result.slice(left,right )

            res.send({
                code: 200,
                message: '获取分类列表成功',
                data: data,
                total: total,
            })
        }   
        
    },
    updateCategory: async(req,res) => {
        const result = await categoryService.updateCategory(req.body)
        res.send({
            code: 200,
            message: '更新分类成功',
            data: result
        })
    },
    delCategory: async(req,res) => {
        const result = await categoryService.delCategory(req.query.id)
        
        res.send({
            code: 200,
            message: '删除分类成功'
        })
    },
    getAllCategory: async(req,res) => {
        const result = await categoryService.getAllCategory()
        
        res.send({
            code: 200,
            message: '获取所有分类成功',
            data: result
        })
    }

   
}

module.exports = categoryController