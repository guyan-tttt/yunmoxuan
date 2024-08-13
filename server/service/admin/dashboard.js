const ArticleModel = require('../../model/ArticleModel')
const CategoryModel = require('../../model/CategoryModel')
const TagModel = require('../../model/TagModel')
const ImageModel = require('../../model/ImageModel')
const TrendsModel = require('../../model/TrendsModel')
const TrendsCommentModel = require('../../model/TrendsComment')
const JournalModel = require('../../model/JournalModel')


const dashboardService = {
    statistics: async() => {
        // 定义统计对象
        const statistics = {
            articleNum: 0,
            categoryNum: 0,
            tagNum: 0,
            pictureNum:0,
            trendsNum: 0,
            trendsCommentNum: 0,
            articleCommentNum: 0
        }
        // 获取文章数量
        statistics.articleNum = await ArticleModel.countDocuments()
        // 获取分类数量
        statistics.categoryNum = await CategoryModel.countDocuments()
        // 获取标签数量
        statistics.tagNum = await TagModel.countDocuments()
        // 获取图片数量
        statistics.pictureNum = await ImageModel.countDocuments()
        // 获取动态数量
        statistics.trendsNum = await TrendsModel.countDocuments()
        // 获取动态评论数量
        statistics.trendsCommentNum = await TrendsCommentModel.countDocuments()
        return statistics
    },
    notice: async() => {
        const data = []
        // 查询文章评论信息
        // 查询动态评论信息
        const trendsComment = await TrendsCommentModel.find({}).limit(20)
        data.push(...trendsComment)
        return data
    },
    addJournal: async(title, content) => {
        await JournalModel.create({
            title,
            content,
            createTime: Date.now(),
            type: 1,
            view: false
        })
    },
    journal: async(left,right,view) => {
        let data = []
        if(view) {
            data = await JournalModel.find({
                type: 1,
                view: false
            }).sort('-createTime')
        } else {
           data = await JournalModel.find({
                type: 1
            }).sort('-createTime').skip(left).limit(right)
        }
        
        const total = await JournalModel.find({type: 1,view: false}).countDocuments()
        return {
            data,
            total
        }
    },
    delJournal: async(id) => {
        await JournalModel.findByIdAndDelete(id)
    },
    readJournal: async(id) => {
        await JournalModel.findByIdAndUpdate(id, {
            view: true
        })
    },
    // 添加消息
    addMessage: async(title,content) => {
        await JournalModel.create({
            title,
            content,
            type: 2,
            view: false,
            createTime: Date.now()
        })
    },
    message: async(left,right,view) => {
        let data = []
        if(view) {
            data = await JournalModel.find({
                type: 2,
                view: false
            }).sort('-createTime')
        } else {
            data = await JournalModel.find({
                type: 2
            }).sort('-createTime').skip(left).limit(right)
        }
        return {
            data,
            total: await JournalModel.find({type: 2,view: false}).countDocuments()
        }
    },
    readMessage: async(id) => {
        await JournalModel.findByIdAndUpdate(id, {
            view: true
        })
    }
}
module.exports = dashboardService