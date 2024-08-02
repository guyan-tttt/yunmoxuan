const categoryService = require('../../service/admin/imageCategory')
const imageService = require('../../service/admin/image')


const pictureController  = {
    getCategory: async(req,res) => {
        // 查询分类
        const category = await categoryService.getCategory();
        res.send({
            code: 200,
            message: '获取成功',
            data: category
        })
    },
    getList: async(req,res) => {
        const { page,pageSize } = req.query
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const id = req.params.id
        const { data,total } = await imageService.getList(id,left,right)

        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        })
    },

}

module.exports = pictureController;