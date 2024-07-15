const imageModel = require('../../model/ImageModel');

const imageService = {
    upload: async(data) => {
        data.forEach(item => {
            imageModel.create(item)
        })
    },
    list: async(categoryID) => {
    //    查询对应分类的图片并以时间排序
       const data = await imageModel.find({categoryID: categoryID}).sort('-createTime')
       data.forEach(item => {
           item.src = process.env.SERVER_BASE_URL + item.src
       })
       return data
    },
    del: async(id) => {
        const data = await imageModel.findByIdAndDelete(id)
        return data
    },
    download: async(id) => {
        const data = await imageModel.findById(id)
        return data
    }
}

module.exports = imageService;