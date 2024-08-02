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
    },
    clear: async(categoryID) => {
        const data = await imageModel.find({categoryID: categoryID})
        await imageModel.deleteMany({categoryID: categoryID})
        return data
    },
    getList: async(categoryID,left,right) => {
        const data = await imageModel.find({categoryID: categoryID}).sort('-createTime').skip(left).limit(right)
        data.forEach(item => {
            item.src = process.env.SERVER_BASE_URL + item.src
        })
        const total = await imageModel.countDocuments({categoryID: categoryID})
        return {
            data,
            total
        }
    }
}

module.exports = imageService;