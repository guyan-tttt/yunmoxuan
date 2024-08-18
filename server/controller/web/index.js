const userService = require("../../service/admin/user")
const imageService = require("../../service/admin/image")
const categoryService = require("../../service/admin/category")
const tagsService = require("../../service/admin/tags")
const dashboardService = require("../../service/admin/dashboard")
const useragent = require('useragent')

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
    },
    journal: async(req,res) => {
        const { page, pageSize } = req.query
        if(!page || !pageSize) {
            res.json({
                code: 400,
                message: '参数错误'
            })
        }
        // 根据分页数据返回列表数据
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const { data, total} = await dashboardService.journal(left,right);
        
        res.send({
            code: 200,
            message: '获取成功',
            data,
            total
        });
    },
    addVisit: async(req,res) => {
        const ip = req.ipInfo.ip // 系统ip
        const agent = req.headers['user-agent'] // 用户代理
        const osInfo = useragent.parse(agent)
        const browser = osInfo.toString().split("/")[0]
        const os = osInfo.os.toString()
        const data = {
            ip,
            browser,
            os
        }
        console.log(data);
        const total = await dashboardService.addVisit(data)

        res.send({
            code: 200,
            message: "获取成功",
            data: total
        })
    }
}

module.exports = indexController