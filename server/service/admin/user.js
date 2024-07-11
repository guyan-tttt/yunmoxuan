const { log } = require('console');
const UserModel  = require('../../model/UserModel');
const fs = require("fs")

const userService = {
    login: async(username, password) => {
            // 查询数据库
            const user = await UserModel.findOne({username, password});
            return user;
    },
    // 获取个人信息
    getUserInfo: async() => {
        const user = await UserModel.findOne({})
        return user;
    },
    // 更新个人信息
    updateUserInfo: async(userInfo,file) => {
        if(file) {
            // 提取新旧文件路径
        const oldFile = file.destination + file.filename
        const newFile = file.destination + file.filename +"." +  file.mimetype.split("/")[1]
        userInfo.avatar = newFile.replace("public","")
        // 将文件重命名
        fs.renameSync(oldFile, newFile, (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("文件重命名成功");
                }
        })
        }
        console.log(userInfo);
        userInfo.avatar  = userInfo.avatar.replace(process.env.SERVER_BASE_URL,"")
        // 更新数据库
        const user = await UserModel.updateOne({
            _id: userInfo._id
        }, userInfo)
        return user;

    }
}

module.exports = userService;