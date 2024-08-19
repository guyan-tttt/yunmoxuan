const animationModel = require('../../model/AnimationModel.js')

const animationService = {
    add: async(data) => {
        await animationModel.create({
            ...data,
            createTime: new Date(),
            updateTime: new Date()
        })
    }
}

module.exports = animationService;