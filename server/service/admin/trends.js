const TrendsModel = require('../../model/TrendsModel')
const UserModel = require('../../model/UserModel')
const TrendsCommentModel = require('../../model/TrendsComment')


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
    },
    list: async() => {
        const data = await TrendsModel.find({}).sort('-createTime')
        for(let i = 0; i < data.length; i++) {
            const item = data[i]
            item.userInfo = await  UserModel.findOne({_id: item.userID})
            item.userInfo.password = "#"
            item.userInfo.avatar = process.env.SERVER_BASE_URL + item.userInfo.avatar

            item.imgList = item.imgList.map(url => process.env.SERVER_BASE_URL + url)
        }
        return data
    },
    detail: async(id) => {
        const data = await TrendsModel.findOne({_id: id})
        data.imgList = data.imgList.map(url => process.env.SERVER_BASE_URL + url)
        return data
    },
    update: async(id,content,imgList) => {
        return await TrendsModel.findByIdAndUpdate(id,{
            content,
            imgList,
            updateTime: Date.now()
        })
    },
    del: async(id) => {
        return await TrendsModel.findByIdAndDelete(id)
    },
    browse: async(id) => {
        return await TrendsModel.findByIdAndUpdate(id,{
            $inc: {lookNum: 1}
        })
    },
    like: async(id) => {
        return await TrendsModel.findByIdAndUpdate(id,{
            $inc: {likeNum: 1}
        })
    },
    comment: async(data) => {
        // 更新评论数量
        await TrendsModel.findByIdAndUpdate(data.trendsID,{
            $inc: {commentNum: 1}
        })
        console.log(data.trendsID);
        // 添加评论数据
        await TrendsCommentModel.create({
            ...data,
            createTime: Date.now()
        })
    },
    commentList: async(trendsID,left,right) => {
        const data = await TrendsCommentModel.find({trendsID}).sort('-createTime').skip(left).limit(right)
        return data
    },
    commentDel: async(id) => {
        // 更新评论数量
        const comment = await TrendsCommentModel.findById(id)
        await TrendsModel.findByIdAndUpdate(comment.trendsID,{
            $inc: {commentNum: -1}
        })
         await TrendsCommentModel.findByIdAndDelete(id)
    }
}

module.exports = trendsService