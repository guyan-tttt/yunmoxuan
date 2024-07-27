const userService = require("../../service/admin/user")
const imageService = require("../../service/admin/image")
const categoryService = require("../../service/admin/category")
const tagsService = require("../../service/admin/tags")

const indexController =  {
    user: async(req,res) => {
        const result = await userService.getUserInfo()
        const data = Object.assign(result)
        data.password = "********"
        data.username = "********"
        data._id = "********"
        data.avatar = process.env.SERVER_BASE_URL + data.avatar
        res.send({
            code: 200,
            message: "获取成功",
            data: data
        })
    },
    banner: async(req,res) => {
        const result = await imageService.list("6691cff285a494b5ddcaecd9")
        res.send({
            code: 200,
            message: "获取成功",
            data: result
        })
    },
    category: async(req,res) => {
        const result = await categoryService.getCategoryList()
        res.send({
            code: 200,
            message: "获取成功",
            data: result
        })
    },
    tag: async(req,res) => {
        const result = await tagsService.getTagList()
        result.forEach(item => {
            item.icon = process.env.SERVER_BASE_URL + item.icon
        })
        res.send({
            code: 200,
            message: "获取成功",
            data: result
        })
    }
}

module.exports = indexController