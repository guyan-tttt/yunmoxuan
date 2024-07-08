const ArticleModel = require('../../model/ArticleModel')
const CategoryModel = require('../../model/CategoryModel')
const TagModel = require('../../model/TagModel')
const UserModel = require('../../model/UserModel')

const articleService = {
   addArticle: async(data) => {
    const articleInfo = {
        ...data,
        viewNum: 0, // 阅读量
        createTime: Date.now(), // 创建时间
        updateTime: Date.now(), // 更新时间
        isDelete: false, // 是否删除
        likeNum: 0, // 点赞数
    }
    const article = await ArticleModel.create(articleInfo)
    return article
   },
   getArticleList: async(left,right) => {
    const articleList = await ArticleModel.find({isDelete: false}).skip(left).limit(right)
    const data = articleList.concat([])
    const total = await ArticleModel.countDocuments({isDelete: false})
    // 查询对应分类
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
            return {
                data,
                total
            }
        }
    }
    
   }
}

module.exports = articleService;