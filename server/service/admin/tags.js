const TagModel  = require('../../model/TagModel');
const fs = require("fs")

const tagsService = {
    addTag: async(data,file) => {
        if(file) {
            // 提取新旧文件路径
        const oldFile = file.destination + file.filename
        const newFile = file.destination + file.filename +".svg"
        data.icon = newFile.replace("public","")
        // 将文件重命名
        fs.renameSync(oldFile, newFile, (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("文件重命名成功");
                }
        })
        
        // 存储数据库
        const res = TagModel.create({
                ...data,
                createTime: new Date(),
                updateTime: new Date()
            })
        return res

        } else {
            return "文件上传失败"
        }
    
    }
    ,
    getTagList: async() => {
        const data = await TagModel.find({})
        return data
    },
    updateTag: async(data) => {
        const res = await TagModel.updateOne({_id: data._id}, {
            ...data,
            updateTime: new Date()
        })
        return res
    },
    delTag: async(query) => {
        const res = await TagModel.deleteOne({_id: query.id})
        return res
    },
    getAllTag: async() => {
        const data = await TagModel.find({})
        return data
    }
}

module.exports = tagsService;