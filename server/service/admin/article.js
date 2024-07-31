const ArticleModel = require('../../model/ArticleModel')
const CategoryModel = require('../../model/CategoryModel')
const TagModel = require('../../model/TagModel')
const UserModel = require('../../model/UserModel')
const ArticleCommentModel = require('../../model/ArticleComment')

const dayjs = require('dayjs')

const articleService = {
   addArticle: async(data) => {
    const articleInfo = {
        ...data,
        viewNum: 0, // 阅读量
        createTime: Date.now(), // 创建时间
        updateTime: Date.now(), // 更新时间
        isDelete: false, // 是否删除
        likeNum: 0, // 点赞数
        commentNum: 0, // 评论数
    }
    const article = await ArticleModel.create(articleInfo)
    return article
   },
   getArticleList: async(left,right,articleType) => {
    let data  = []
    let total = 0
    if(articleType === 1) {
        const articleList = await ArticleModel.find({isDelete: false}).skip(left).limit(right)
        data = articleList.concat([])
        total = await ArticleModel.countDocuments({isDelete: false})
    } else if(articleType === 2) {
        // 查询已发布的文章
        const articleList = await ArticleModel.find({isDelete: false, isPublish: true}).skip(left).limit(right)
        data = articleList.concat([])
        total = await ArticleModel.countDocuments({isDelete: false, isPublish: true})
    } else if(articleType === 3) {
        // 查询未发布的文章
        const articleList = await ArticleModel.find({isDelete: false, isPublish: false}).skip(left).limit(right)
        data = articleList.concat([])
        total = await ArticleModel.countDocuments({isDelete: false, isPublish: false})
    } else if(articleType === 4) {
        // 查询已删除的文章
        const articleList = await ArticleModel.find({isDelete: true}).skip(left).limit(right)
        data = articleList.concat([])
        total = await ArticleModel.countDocuments({isDelete: true})
    }
    // 查询对应分类
    for(let i = 0;i < data.length;i++) {
        const item = data[i]
        const category = await CategoryModel.findById(item.categoryID)
        const user = await UserModel.findById(item.authorID)
        const tagID = item.tags[0].split(",")
        const tag = await TagModel.find({_id: {$in: tagID}})
        tag.forEach(item => {
            item.icon = process.env.SERVER_BASE_URL + item.icon
        })
        item.aboutInfo = {
            category,
            user: user.nickname
        }
        item.tags = tag
        item.cover = process.env.SERVER_BASE_URL + item.cover
        if(i === data.length -1) {
            return {
                data,
                total
            }
        }
    }
    return {
        data,
        total: 0
    }
    
   },
   getArticleDetail: async(id) => {
    const article = await ArticleModel.findById(id)
    const category = await CategoryModel.findById(article.categoryID)
    const user = await UserModel.findById(article.authorID)
    const tagID = article.tags[0].split(",")
    const tag = await TagModel.find({_id: {$in: tagID}})
    tag.forEach(item => {
        item.icon = process.env.SERVER_BASE_URL + item.icon
    })
    article.tags = tagID
    article.aboutInfo = {
        category,
        author: user.nickname,
        tags: tag
    }
    article.cover = process.env.SERVER_BASE_URL + article.cover
    return article
   },
   updateArticle: async(data) => {
    data.updateTime = Date.now()
    const article = await ArticleModel.findByIdAndUpdate(data._id, data)
    return article
   },
   delArticle: async(id) => {
    const article = await ArticleModel.findByIdAndUpdate(id, {isDelete: true})
    return article
   },
   changePublish: async(id,isPublish) =>  {
    const article = await ArticleModel.findByIdAndUpdate(id, {isPublish})
   },
   searchArticle: async(tagsID,categoryID,articleType) => {
    let data = []
    if(articleType === 1) {
        const articleList = await ArticleModel.find({isDelete: false,  categoryID})
        data = articleList.concat([])
    } else if(articleType === 2) {
        // 查询已发布的文章
        const articleList = await ArticleModel.find({isDelete: false, isPublish: true, categoryID})
        data = articleList.concat([])
    } else if(articleType === 3) {
        // 查询未发布的文章
        const articleList = await ArticleModel.find({isDelete: false, isPublish: false, categoryID})
        data = articleList.concat([])
    } else if (articleType === 4) {
        // 查询已删除的文章
        const articleList = await ArticleModel.find({isDelete: true, categoryID})
        data = articleList.concat([])
    }
    
    
    for(let i = 0;i < data.length;i++) {
        const item = data[i]
        const category = await CategoryModel.findById(item.categoryID)
        const user = await UserModel.findById(item.authorID)
        const tagID = item.tags[0].split(",")
        const tag = await TagModel.find({_id: {$in: tagID}})
        tag.forEach(item => {
            item.icon = "http://localhost:3000" + item.icon
        })
        item.aboutInfo = {
            category,
            user: user.nickname
        }
        item.tags = tag
        item.cover = "http://localhost:3000" + item.cover
        if(i === data.length -1) {
            return data
        }
    }
    return data
   },
   delArticleRecover: async(id) => {
    const article = await ArticleModel.findByIdAndUpdate(id, {isDelete: false})
    return article
   },
   delArticlePermanently: async(id) => {
    const article = await ArticleModel.findByIdAndDelete(id)
    return article
   },
   delArticleAll: async(ids) => {
    const article = await ArticleModel.deleteMany({_id: {$in: ids}})
    return article
   },
   statistics: async() => {
        // 定义统计量对象
        const count = {
            articleNum: 0,
            articlePublishNum: 0,
            articleUnPublishNum: 0,
            articleDeleteNum: 0,
            weekData: {}
        }
        // 查询文章总数
        count.articleNum = await ArticleModel.countDocuments({isDelete: false})
        // 查询已发布的文章数
        count.articlePublishNum = await ArticleModel.countDocuments({isDelete: false, isPublish: true})
        // 查询未发布的文章数
        count.articleUnPublishNum = await ArticleModel.countDocuments({isDelete: false, isPublish: false})
        // 查询已删除的文章数
        count.articleDeleteNum = await ArticleModel.countDocuments({isDelete: true})
        // 查询在上次发布时间一长周内发布的文章数
        const nowDate = new Date()
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        const data = await ArticleModel.find({
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
   },
   getRecommends: async() => {
        const data = await ArticleModel.find({isDelete: false, isTop: true}).limit(10).sort( {createTime: -1} )
        for(let item of data) {
            item.cover = process.env.SERVER_BASE_URL + item.cover
            const category = await CategoryModel.findById(item.categoryID)
            const user = await UserModel.findById(item.authorID)
            const tagID = item.tags[0].split(",")
            const tag = await TagModel.find({_id: {$in: tagID}})
            tag.forEach(item => {
                item.icon = process.env.SERVER_BASE_URL + item.icon
            })
            item.aboutInfo = {
                category,
                user: {
                    name: user.nickname,
                    avatar: user.avatar,
                }
            }
            item.tags = tag
        }
        return data
   },
   getList: async(left,right) => {
    const data = await ArticleModel.find({isDelete: false ,isPublish: true}).limit(right).skip(left).sort( {createTime: -1} )
    const total = await ArticleModel.countDocuments({isDelete: false, isPublish: true})
        for(let item of data) {
            item.cover = process.env.SERVER_BASE_URL + item.cover
            const category = await CategoryModel.findById(item.categoryID)
            const user = await UserModel.findById(item.authorID)
            const tagID = item.tags[0].split(",")
            const tag = await TagModel.find({_id: {$in: tagID}})
            tag.forEach(item => {
                item.icon = process.env.SERVER_BASE_URL + item.icon
            })
            item.aboutInfo = {
                category,
                user: {
                    name: user.nickname,
                    avatar: user.avatar,
                }
            }
            item.tags = tag
        }
        return {
            data,
            total
        }
   },
   like: async(id) => {
    await ArticleModel.findByIdAndUpdate(id, {
        $inc: {likeNum: 1}
    })
   },
   getPrevAndNext: async(id,createTime) => {
    console.log(createTime);
    const prev = await ArticleModel.find({isDelete: false, isPublish: true }).where("createTime").lt(createTime).sort( {createTime: -1} ).limit(1).select("title")
    const next = await ArticleModel.find({isDelete: false, isPublish: true }).where("createTime").gt(createTime).sort( {createTime: 1} ).limit(1).select("title")
    return {
        prev,
        next
    }
   },
   addView: async(id) => {
    await ArticleModel.findByIdAndUpdate(id, {
        $inc: {viewNum: 1}
    })
   },
   addComment: async(data) => {
    // 增加评论数
    await ArticleModel.findByIdAndUpdate(data.articleID, {
        $inc: {commentNum: 1}
    })
    await ArticleCommentModel.create(data)
   },
   getCommentList: async(id,left,right ) => {

    const data = await ArticleCommentModel.find({articleID: id}).sort( {createTime: -1} ).skip(left).limit(right)
    const total = await ArticleCommentModel.countDocuments({articleID: id})
    return {
        data,
        total
    }
   }
}

module.exports = articleService;