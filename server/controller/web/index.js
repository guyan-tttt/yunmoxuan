const userService = require("../../service/admin/user")

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
    }
}

module.exports = indexController