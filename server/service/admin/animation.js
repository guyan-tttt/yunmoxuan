const animationModel = require('../../model/AnimationModel.js')
const imageModel = require('../../model/ImageModel.js')

const animationService = {
    add: async(data) => {
        await animationModel.create({
            ...data,
            createTime: new Date(),
            updateTime: new Date()
        })
    },
    list: async(left,right) => {
        const data = await animationModel.find({}).sort({ createTime: -1 }).skip(left).limit(right)
        for(let item of data) {
            item.cover = process.env.SERVER_BASE_URL + item.cover
        }
        const total = await animationModel.countDocuments({})
        return {
            data,total
        }
    },
    detail: async(id) => {
        const data = await animationModel.findOne({ _id: id })
        data.cover = process.env.SERVER_BASE_URL + data.cover
        return data
    },
    addImg: async(data) => {
        data.forEach(item => {
            imageModel.create(item)
        })
    },
    imgList: async(id) => {
        const data = await imageModel.find({ categoryID: id }).sort({ createTime: -1 })
        for(let item of data) {
            item.src = process.env.SERVER_BASE_URL + item.src
        }
        return data
    }
}

module.exports = animationService;