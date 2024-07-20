var express = require('express');
var router = express.Router();
const trendsController = require('../../controller/admin/trends')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/trends/' })

// 添加动态
router.post("/add",upload.array("files",9),trendsController.add)

// 获取动态列表
router.get("/list",trendsController.list)

// 获取动态详情
router.get("/detail",trendsController.detail)

// 修改动态
router.put("/update",upload.array("files",9),trendsController.update)

// 删除动态
router.delete("/del",trendsController.del)

// 浏览量
router.put("/browse",trendsController.browse)

// 点赞量
router.put("/like",trendsController.like)

// 添加评论
router.post("/comment/add",trendsController.comment)

// 获取评论列表
router.get("/comment/list",trendsController.commentList)

// 删除评论
router.delete("/comment/del",trendsController.commentDel)

module.exports =  router