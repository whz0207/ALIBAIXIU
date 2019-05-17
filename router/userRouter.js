//处理所有与 用户 有关的路由
const express = require('express');
const userContro = require('../controller/userContro');
const router = express.Router();

//得到静态页面
router.get('/user', (req, res) => {
    userContro.getUser(req, res);
})

// 添加一个添加用户的路由
router.post('/addUser', (req, res) => {
    userContro.addUser(req, res);
})

// 添加一个获取所有用户信息的路由
router.get('/getAllusers', (req, res) => {
    userContro.getAllusers(req, res);
})

// 添加一个删除单个用户数据的路由
router.get('/delUser', (req, res) => {
    userContro.delUser(req,res);
})

// 添加一个获取编辑页面的路由


//暴露接口
module.exports = router;