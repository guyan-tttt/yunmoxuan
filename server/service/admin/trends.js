const TrendsModel = require('../../model/TrendsModel')

const trendsService = {
    add: async(content,userID,imgList) => {
        TrendsModel.create({
            content,
            userID,
            imgList,
            createTime: Date.now(),
            updateTime: Date.now(),
            likeNum: 0, // 点赞数量
            commentNum: 0, // 评论数量
            lookNum: 0, // 浏览数量
            userInfo: null
        })
    }
}

module.exports = trendsService