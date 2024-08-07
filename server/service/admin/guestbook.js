const guestbookModel = require('../../model/guestbookModel');

const guestbookService = {
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
    delete: async(id) => {
        await guestbookModel.findByIdAndDelete(id);
    }
}

module.exports = guestbookService;