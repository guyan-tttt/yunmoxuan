const userService = require('../../service/admin/user')
const JWT = require('../../utils/JWT')

const userController = {
    
    login: async(req,res) => {
        // 解析用戶名和密碼
        const { username, password } = req.body

        // 登录逻辑
        const result = await userService.login(username,password)
        if(result._id) {
            // 生成token
            const token = JWT.generate({
                id: result._id,
                username: result.username,
            },'48h')
            // 挂载到请求头
            res.header("Authorization", token)
            // 返回登录成功信息
            res.send({
                code: 200,
                message: '登录成功',
                token: token
            })
        } else {
            res.send({
                code: 500,
                message: '登录失败'
            })
        }
        

    },

    // 获取个人详情
    getUserInfo: async(req,res)  => {
        const result = await userService.getUserInfo()
        delete result.password
        res.send({
            code: 200,
            message: '获取个人信息成功',
            data: result
        })

    },

    // 修改个人信息
    updateUserInfo:async(req,res) => {
        console.log(req.body);
        console.log(req.file);
        const result = await userService.updateUserInfo(req.body,req.file)
        
        // 返回修改个人信息成功信息
        res.send({
            code: 200,
            message: '修改个人信息成功',
        })
    }
}

module.exports = userController