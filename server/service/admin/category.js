const CategoryModel = require('../../model/CategoryModel')

const categoryService = {
    addCategory: async(data) => {
        const category  = await CategoryModel.create(data)
        return category
    
    },
    getCategoryList: async() => {
        const categoryList = await CategoryModel.find()
        return categoryList
    },
    updateCategory: async(data) => {
        // console.log(data);
        data.updateTime = Date.now()
        // 更新数据库
        const category = await CategoryModel.findByIdAndUpdate(data._id, data)
        return category
    },
    delCategory: async(id) => {
        const category = await CategoryModel.findByIdAndDelete(id)
        return category
    }
}

module.exports = categoryService;