const ImageCategoryModel = require('../../model/ImageCategory')

const ImageCategory = {
    add: async(data) => {
        const result = await ImageCategoryModel.create(data)
        return result
    },
    list: async() => {
        const result = await ImageCategoryModel.find({})
        return result
    },
    update: async(id,name) => {
        const result = await ImageCategoryModel.updateOne({_id: id}, {name,updateTime: Date.now()})
        return result
    },
    del: async(id) => {
        const result = await ImageCategoryModel.deleteOne({_id: id})
        return result
    }
} 
module.exports = ImageCategory