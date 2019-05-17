//处理所有与 用户 有关的路由
const express = require('express');
const userContro = require('../controller/userContro');
const router = express.Router();

//得到静态页面
router.get('/user', userContro.getUser)
    .post('/addUser', userContro.addUser)  // 添加一个添加用户的路由
    .get('/getAllusers', userContro.getAllusers)  // 添加一个获取所有用户信息的路由
    .get('/delUser', userContro.delUser)  // 添加一个删除单个用户数据的路由
    .get('/getUserById',userContro.getUserById)  // 添加一个根据id得到数据的路由
    .post('/editUser',userContro.editUser)  // 添加一个修改用户数据的路由
    .post('/delUserByIds',userContro.delUserByIds) //添加一个删除多个用户数据的路由

//暴露接口
module.exports = router;