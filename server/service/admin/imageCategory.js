const ImageCategoryModel = require('../../model/ImageCategory')
const ImageModel = require('../../model/ImageModel')
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
    },
    getCategory: async() => {
        const result = await ImageCategoryModel.find({})
        for(let i  = 0; i < result.length; i++) {
            const item = result[i]
            item.cover = process.env.SERVER_BASE_URL + `/images/imageCategory/list${i + 1}.png`
        }
        return result
    }
} 
module.exports = ImageCategory