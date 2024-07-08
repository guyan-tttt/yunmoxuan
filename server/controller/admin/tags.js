const tagsService = require('../../service/admin/tags')
const fs = require('fs')
const tagsController = {
    addTag: async(req,res) => {
        console.log(req.body,req.file);

        const result = await tagsService.addTag(req.body,req.file)

        res.send({
            code: 200,
            message: '添加标签成功',
        })
    },
    getTagList: async(req,res) => {
        console.log(req.query);
        const { page , pageSize } = req.query
        // 查询数据
        const result = await tagsService.getTagList()
        const left = (parseInt(page) - 1) * parseInt(pageSize)
        const right = left + parseInt(pageSize)
        const total = result.length
        const data = result.slice(left,right )
        res.send({
            code: 200,
            message: '获取标签列表成功',
            data: data,
            total: total
        })
    },
    // 修改标签性情
    updateTag: async(req,res) => {
        // 判断是否上传文件
    //   文件重命名
        if(req.file) {
            // 提取新旧文件路径
        const oldFile = req.file.destination + req.file.filename
        const newFile = req.file.destination + req.file.filename +".svg" 
        // 将文件重命名
        fs.renameSync(oldFile, newFile, (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("文件重命名成功");
                }
        })
        }
       const url = req.file ? (req.file.destination +  req.file.filename + ".svg").replace("public","") : req.body.icon.replace("http://localhost:3000","")
       req.body.icon = url
       const result = await tagsService.updateTag(req.body)
       res.send({
        code: 200,
        message: '修改标签成功'
       })
    },
    // 删除标签
    delTag: async(req,res) => {
        const result = await tagsService.delTag(req.query)
        res.send({
            code: 200,
            message: '删除标签成功',
        })
    },
    getAllTag: async(req,res) => {
        const result = await tagsService.getAllTag()
        if(result.length > 0) {
            result.forEach(item => {
                item.icon = "http://localhost:3000" + item.icon
            })
        }
        res.send({
            code: 200,
            message: '获取所有标签成功',
            data: result
        })
    }
   
}

module.exports = tagsController