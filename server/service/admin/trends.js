const TrendsModel = require('../../model/TrendsModel')
const UserModel = require('../../model/UserModel')
const TrendsCommentModel = require('../../model/TrendsComment')
const dayjs = require('dayjs')


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
        const total = await TrendsCommentModel.find({trendsID}).countDocuments()
        return {
            data,
            total
        }
    },
    commentDel: async(id) => {
        // 更新评论数量
        const comment = await TrendsCommentModel.findById(id)
        await TrendsModel.findByIdAndUpdate(comment.trendsID,{
            $inc: {commentNum: -1}
        })
         await TrendsCommentModel.findByIdAndDelete(id)
    },
    trendsWeek: async() => {
        const nowDate = new Date()
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        const data = await TrendsModel.find({
            createTime: {
                $gt: weekAgo,
                $lt: nowDate
            }
        })
        return data
    },
    statistics: async() => {
        // 定义统计量对象
        const count = {
            trendNum: 0,
            lookNum: 0,
            likeNum: 0,
            commentNum: 0,
            weekData: {}
        }
        // 查询动态
        const trendList = await TrendsModel.find({})
        count.trendNum = trendList.length
        // 查询点赞数量
        count.likeNum = trendList.reduce((p,i) => p + i.likeNum,0 )
        // 查询评论数量
        count.commentNum = trendList.reduce((p,i) => p + i.commentNum,0 )
        // 查询浏览量
        count.lookNum = trendList.reduce((p,i) => p + i.lookNum,0 )
   
        // 查询一周内文章发布量
        const item = await TrendsModel.find().sort({ createTime: -1 }).limit(1) // 查询上一次距今最近的分布于时间
        // 查询在上次发布时间一长周内发布的文章数
        const nowDate = new Date(item[0].createTime)
        const weekAgo = new Date(item[0].createTime)
        weekAgo.setDate(weekAgo.getDate() - 7)
        const data = await TrendsModel.find({
            createTime: {
                $gt: weekAgo,
                $lt: nowDate
            }
        })
        for(let i of data) {
            const key = dayjs(i.createTime).format("YYYY/MM/DD")
            count.weekData[key] = 0
        }
        for(let i of data) {
            const key = dayjs(i.createTime).format("YYYY/MM/DD")
            count.weekData[key]++
        }
        return count
    }
}


module.exports = trendsService