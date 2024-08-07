const guestbookModel = require('../../model/guestbookModel');

const guestbookService = {
    add: async(data) => {
        return await guestbookModel.create({
            ...data,
            createTime: new Date()
        })
    },
    getList: async(skip,limit) => {
        const data = await guestbookModel.find().sort({
            createTime: -1
        }).skip(skip).limit(limit);
        const total = await guestbookModel.countDocuments();
        return {
            data,
            total
        }
    },
    getBullet:async() => {
        const data = await guestbookModel.find().sort({
            createTime: -1
        })
        return data
    }
}

module.exports = guestbookService;