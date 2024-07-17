const { log } = require('console')
const trendsService = require('../../service/admin/trends')
const renameFile = require('../../utils/renameFile')
const dayjs = require('dayjs')
const fs = require('fs')
const path = require('path')

const trendsController = {
    add: async(req,res) => {
        const { content,userID } = req.body
        const imgList = []
        req.files.forEach(item => {
            const src = renameFile(item,item.mimetype.split("/")[1])
            imgList.push(src)
        })
        
        // 添加数据库
        const result = await trendsService.add(content,userID,imgList)
        res.send({
            code: 200,
            msg: '添加成功',
        })
    }
}

module.exports = trendsController;